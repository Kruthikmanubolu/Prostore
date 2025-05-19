import { z } from 'zod';
import { formatNumberWithDecimal } from './utils';

const currency = z.string().refine((value) => /^\d+(\.\d{2})?/.test(formatNumberWithDecimal(Number(value).toString())), 'price must exactly two decimal places')

// Schema for inserting products

export const insertProductSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    slug: z.string().min(3, 'Slug must be at least 3 characters'),
    Category: z.string().min(3, 'Category must be at least 3 characters'),
    Brand: z.string().min(3, 'Brand must be at least 3 characters'),
    Description: z.string().min(3, 'Description must be at least 3 characters'),
    stock: z.coerce.number(),
    images: z.array(z.string()).min(1, 'Product must have atleast 1 image'),
    isFeatured: z.boolean(),
    banner: z.string().nullable(),
    price: currency
});

//Schema for signing users in
export const signInFormSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be atleast 6 characters')
})

//Schema for signup

export const signUpFormSchema = z.object({
    name: z.string().min(3, 'Name must be atleat characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be atleast 6 characters'),
    confirmPassword: z.string().min(6, 'Confirm password must be atleast 6 characters')
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
})




// Cart schemas

export const cartItemSchema = z.object({
    productId: z.string().min(1, 'Product is required'),
    name: z.string().min(1, 'Name is required'),
    slug: z.string().min(1, 'Slug is required'),
    qty: z.number().int().nonnegative('Quantity must be a positive number'),
    image: z.string().min(1, 'Image is required'),
    price: currency

})


export const insertCartSchema = z.object({
    items: z.array(cartItemSchema),
    itemsPrice: currency,
    totalPrice: currency,
    shippingPrice: currency,
    taxPrice: currency,
    sessionCartId: z.string().min(1,'Session card id is required'),
    userId: z.string().optional().nullable(),
})

export const shippingAddressSchema = z.object({
    fullName: z.string().min(3, 'Name must be atleast 3 characters'),
    streetAddress: z.string().min(3, 'Address must be atleast 3 characters'),
    city: z.string().min(3, 'city must be atleast 3 characters'),
    postalCode: z.string().min(3, 'Postal Code must be atleast 3 characters'),
    country: z.string().min(3, 'country must be atleast 3 characters'),
    lat: z.number().optional(),
    lng: z.number().optional()
})