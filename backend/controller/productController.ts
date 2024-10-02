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
        const category = body.category_name.split(" > ") ? body.category_name.split(" > ")[category_length - 1] : body.category_name
        console.log(category)
        const product = await prisma.product.create({
            data: {
                name: body.name,
                description: body.description,
                category_name: category,
            },
        });
        let newVariant: any;
        if (body.variantName) {
            newVariant = await prisma.variant.create({
                data: {
                    variantName: body.variantName,
                    product_name: product.name,
                    secondVariant: body.secondVariant
                },
            });

        }
        let firstVariantValues: any
        if (body.variantValue && body.variantValue[0]) {

            firstVariantValues = body.variantValue[0].slice(0, -1).map(async (value1) => {

                return prisma.variantValue.create({
                    data: {
                        variantValue: value1,
                        variantNameId: newVariant.id,
                    },
                });
            })
        }

        let secondVariantValues: any
        if (body.variantValue && body.variantValue[1]) {
            secondVariantValues = body.variantValue[1].slice(0, -1).map(async (value1) => {

                return prisma.secondVariantValue.create({
                    data: {
                        variantValue: value1,
                        VariantId: newVariant.id
                    },
                });
            })

        }

        let stockEntries: any   
        if (body.price && body.amount  && body.codeVariant) {

            stockEntries = body.price.map(async (value, index) => {
                return prisma.stock.create({
                    data: {
                        price: value,
                        amount:body.amount ? body.amount[index] : 0,
                        codeVariant:body.codeVariant ? body.codeVariant[index]: "",
                        VariantId: newVariant.id
                    }
                })  
            })
        }


        await Promise.all([...firstVariantValues, ...secondVariantValues, ...stockEntries]);

        console.log(body)
        return new Response(JSON.stringify("Product Created!"), {
            status: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error creating product:', error);
            return new Response(JSON.stringify({ error: "Error creating product" }), {
                status: 500,
                headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
        }

        console.error('Unexpected error:', error);
        return new Response(JSON.stringify({ error: 'An unknown error occurred' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
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