"use server";

import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

import { CartItem } from "@/types";
import { convertToPlainObj, formatError, round2 } from "../utils";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { cartItemSchema, insertCartSchema } from "../validators";
import { revalidatePath } from "next/cache";

// ✅ READ-ONLY function for SSR or anywhere
export async function getSessionCartId() {
  const cookieStore = await cookies();
  return cookieStore.get("sessionCartId")?.value ?? null;
}

// ✅ Can only be used inside Server Actions or Route Handlers (cookie setter allowed)
async function getOrCreateSessionCartIdSafe() {
  const cookieStore = await cookies();
  let sessionCartId = cookieStore.get("sessionCartId")?.value;

  if (!sessionCartId) {
    const newId = uuidv4();
    cookieStore.set("sessionCartId", newId, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    return newId;
  }

  return sessionCartId;
}

// Calculate cart prices
const calcPrice = (items: CartItem[]) => {
  const itemsPrice = round2(
      items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
    ),
    shippingPrice = round2(itemsPrice > 100 ? 0 : 10),
    taxPrice = round2(0.15 * itemsPrice),
    totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};

// ✅ Server Action: Add item to cart
export async function addItemToCart(data: CartItem) {
  try {
    const sessionCartId = await getOrCreateSessionCartIdSafe();

    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    const cart = await getMyCart(sessionCartId, userId);

    const item = cartItemSchema.parse(data);

    const product = await prisma.product.findFirst({
      where: { id: item.productId },
    });
    if (!product) throw new Error("Product not found");

    if (!cart) {
      const newCart = insertCartSchema.parse({
        userId,
        items: [item],
        sessionCartId,
        ...calcPrice([item]),
      });

      await prisma.cart.create({
        data: newCart,
      });

      revalidatePath(`/product/${product.slug}`);
      return { success: true, message: `${product.name} added to cart` };
    } else {
      const existItem = (cart.items as CartItem[]).find(
        (x) => x.productId === item.productId
      );

      if (existItem) {
        if (product.stock < existItem.qty + 1) {
          throw new Error("Not enough stock");
        }

        (cart.items as CartItem[]).find(
          (x) => x.productId === item.productId
        )!.qty = existItem.qty + 1;
      } else {
        if (product.stock < 1) throw new Error("Not enough stock");

        cart.items.push(item);
      }

      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: { set: cart.items as any },
          ...calcPrice(cart.items as CartItem[]),
        },
      });

      revalidatePath(`/product/${product.slug}`);
      return {
        success: true,
        message: `${product.name} ${existItem ? "updated in" : "added to"} cart`,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// ✅ Shared Cart Getter (No cookie writes allowed here)
export async function getMyCart(
  sessionCartId?: string | null,
  userId?: string | null
) {
  if (!sessionCartId) {
    sessionCartId = await getSessionCartId();
  }

  if (!sessionCartId && !userId) return undefined;

  if (!userId) {
    const session = await auth();
    userId = session?.user?.id ?? undefined;
  }
  

  const whereClause =
  userId !== undefined
    ? { userId }
    : sessionCartId !== null
    ? { sessionCartId }
    : undefined;

if (!whereClause) return undefined; // No filters, cannot query cart.

  const cart = await prisma.cart.findFirst({
    where: whereClause,
  });

  if (!cart) return undefined;

  return convertToPlainObj({
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  });
}

// ✅ Server Action: Remove item from cart
export async function removeItemFromCart(productId: string) {
  try {
    const sessionCartId = await getOrCreateSessionCartIdSafe();

    const product = await prisma.product.findFirst({
      where: { id: productId },
    });
    if (!product) throw new Error("Product not found");

    const cart = await getMyCart(sessionCartId);
    if (!cart) throw new Error("Cart not found");

    const exist = (cart.items as CartItem[]).find(
      (x) => x.productId === productId
    );
    if (!exist) throw new Error("Item not found");

    if (exist.qty === 1) {
      cart.items = (cart.items as CartItem[]).filter(
        (x) => x.productId !== exist.productId
      );
    } else {
      (cart.items as CartItem[]).find(
        (x) => x.productId === productId
      )!.qty = exist.qty - 1;
    }

    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: { set: cart.items as any },
        ...calcPrice(cart.items as CartItem[]),
      },
    });

    revalidatePath(`/product/${product.slug}`);

    return { success: true, message: `${product.name} was removed from cart` };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
