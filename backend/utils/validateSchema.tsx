import { z } from 'zod'

export const addProductSchema = z.object({
    name: z.string().min(1, { message: "Please Input Name" }),
    description: z.string().min(1, { message: "Please Input description" }),
    category_name: z.string().min(1, { message: "Please Input Category" }),
    variantName: z.array(z.string()).min(1, { message: "Please Input Variant Name" }),
    variantValue: z.array(z.array(z.string())).min(1, { message: "Please Input Variant Value" }),
    price: z.array(z.number()).min(1, { message: "Please Input Price" }),
    amount: z.array(z.number()).min(1, { message: "Please Input Amount" }),
    codeVariant: z.array(z.string()).min(1, { message: "Please Input Code Variant" }),
})