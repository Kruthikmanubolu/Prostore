import { z } from 'zod';
import { formatNumberWithDecimal } from './utils';

const currency = z.string().refine((value) => /^\d+(\.\d{2})?/.test(formatNumberWithDecimal(Number(value).toString())),'price must exactly two decimal places')

// Schema for inserting products

export const insertProductSchema = z.object({
    name : z.string().min(3, 'Name must be at least 3 characters'),
    slug : z.string().min(3, 'Slug must be at least 3 characters'),
    Category : z.string().min(3, 'Category must be at least 3 characters'),
    Brand : z.string().min(3, 'Brand must be at least 3 characters'),
    Description: z.string().min(3, 'Description must be at least 3 characters'),
    stock : z.coerce.number(),
    images: z.array(z.string()).min(1, 'Product must have atleast 1 image'),
    isFeatured: z.boolean(),
    banner : z.string().nullable(),
    price : currency
});

//Schema for signing users in
export const signInFormSchema = z.object({
    email : z.string().email('Invalid email address'),
    password : z.string().min(6,'Password must be atleast 6 characters')
})

//Schema for signup

export const signUpFormSchema = z.object({
    name: z.string().min(3, 'Name must be atleat characters'),
    email : z.string().email('Invalid email address'),
    password : z.string().min(6,'Password must be atleast 6 characters'),
    confirmPassword: z.string().min(6, 'Confirm password must be atleast 6 characters')
}).refine((data) => data.password === data.confirmPassword,{
    message: "Passwords don't match",
    path:['confirmPassword'],
})
