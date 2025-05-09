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