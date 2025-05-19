"use client";
import { useRouter } from "next/navigation";
import { Cart } from "@/types";
import { toast } from "sonner";
import { useTransition } from "react";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { ArrowRight, Loader, Minus, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const CartTable = ({ cart }: { cart?: Cart }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <h1 className="py-4 h2-bold text-lg sm:text-xl md:text-2xl">
        Shopping Cart
      </h1>
      {!cart || cart.items.length === 0 ? (
        <div className="text-center py-6 text-sm sm:text-base">
          Cart is empty.{" "}
          <Link className="text-blue-500 underline" href="/">
            Go Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-4 md:gap-6">
          <div className="overflow-x-auto md:overflow-visible md:col-span-3">
            <Table className="min-w-[600px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Subtotal</TableHead>

                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.items.map((item) => (
                  <TableRow key={item.slug}>
                    <TableCell>
                      <Link
                        href={`/product/${item.slug}`}
                        className="flex items-center"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                        />
                        <span className="px-2">{item.name}</span>
                      </Link>
                    </TableCell>
                    <TableCell className="flex flex-wrap items-center justify-center gap-2">
                      <Button
                        disabled={isPending}
                        variant="outline"
                        type="button"
                        onClick={() =>
                          startTransition(async () => {
                            const res = await removeItemFromCart(
                              item.productId
                            );
                            if (!res.success) {
                              toast(res.message, {
                                className: "bg-red-500",
                              });
                            }
                          })
                        }
                      >
                        {isPending ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          <Minus className="w-4 h-4" />
                        )}
                      </Button>
                      <span>{item.qty}</span>
                      <Button
                        disabled={isPending}
                        variant="outline"
                        type="button"
                        onClick={() =>
                          startTransition(async () => {
                            const res = await addItemToCart(item);
                            if (!res.success) {
                              toast(res.message, {
                                className: "bg-red-500",
                              });
                            }
                          })
                        }
                      >
                        {isPending ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">$ {item.price}</TableCell>
                    <TableCell className="text-right">$ {item.qty * Number(item.price)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-3 md:p-6 flex flex-col gap-4 text-md md:text-base">
                <div className="pb-3 text-xl">
                  Total ({cart.items.reduce((a, c) => a + c.qty, 0)}):{" "}
                  <span className="font-bold">
                    {formatCurrency(cart.itemsPrice)}
                  </span>
                </div>
                <Button
                  className="w-full hover:cursor-pointer"
                  disabled={isPending}
                  onClick={() => {
                    startTransition(() => router.push("/shipping-address"));
                  }}
                >
                  {isPending ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}{" "}
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default CartTable;
