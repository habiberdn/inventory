import { z } from 'zod';

const addProductSchema = z.object({
    name: z.string().min(1, { message: "Please Input Name" }),
    description: z.string().min(1, { message: "Please Input description" }),
    category_name: z.string().min(1, { message: "Please Input Category" }),
    variantName: z.string().optional(),
    secondVariant: z.string().optional(),
    variantValue: z.array(z.array(z.string())).optional() || z.string().optional(),
    price: z.array(z.number()).optional() || z.number().optional(),
    amount: z.array(z.number()).optional() || z.number().optional(),
    codeVariant: z.array(z.string()).optional() || z.string().optional(),
});

export default addProductSchema;
