import { PrismaClient } from "@prisma/client";
import { addProductSchema } from "../utils/validateSchema";

const prisma = new PrismaClient();

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const createProduct = async (req: Request): Promise<Response> => {
    try {
        const body = await addProductSchema.parseAsync(await req.json())

        const category_length = body.category_name.split(" > ").length
        const category = body.category_name.split(" > ")[category_length - 1]

        const product = await prisma.product.create({
            data: {
                name: body.name,
                description: body.description,
                category_name: category,
            },
        });

        const newVariant = await prisma.variant.create({
            data: {
                variantName: body.variantName[0],
                product_name: product.name,
                secondVariant: body.variantName[1]
            },
        });

        const firstVariantValues = body.variantValue[0].slice(0, -1).map(async (value1) => {

            return prisma.variantValue.create({
                data: {
                    variantValue: value1,
                    variantNameId: newVariant.id,
                },
            });
        })

        const secondVariantValues = body.variantValue[1].slice(0, -1).map(async (value1) => {

            return prisma.secondVariantValue.create({
                data: {
                    variantValue: value1,
                    VariantId: newVariant.id
                },
            });
        })

        const stockEntries = body.price.map(async (value, index) => {
            return prisma.stock.create({
                data: {
                    price: value,
                    amount: body.amount[index],
                    codeVariant: body.codeVariant[index],
                    VariantId: newVariant.id
                }
            })
        })

        await Promise.all([...firstVariantValues, ...secondVariantValues, ...stockEntries]);

        console.log(body)
        return new Response(JSON.stringify("Product Created!"), {
            status: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch products' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

const getProducts = async (req: Request): Promise<Response> => {
    try {
        const products = await prisma.product.findMany();
        return new Response(JSON.stringify(products), {
            status: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch products' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};


export default { createProduct, getProducts }