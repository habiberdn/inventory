import { PrismaClient, Status } from "@prisma/client";
import type { MiddlewareProduct } from "../utils/type-utils";
import { AppError } from "../utils/appError";

const prisma = new PrismaClient();

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const createProduct = async (req: Request): Promise<Response> => {
    try {
        const body = await req.json();
        const { name, description } = body;

        const product = await prisma.product.create({
            data: {
                name,
                description,
                status: body.status as Status,
            },
        });

        return new Response(JSON.stringify(product), {
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
        console.log(products);
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

// const getProductById: MiddlewareProduct = async (req) => {
// try {
// const product = await prisma.product.findUnique({
//     where: { id: parseInt(req.body.id, 10) },
// });

// if (!product) {
//     res.statusCode = 404;
//     res.end('Product not found');
//     return;
// }

// res.statusCode = 200;
// res.setHeader('Content-Type', 'application/json');
// res.end(JSON.stringify(product));
// } catch (error) {
//     return new Response(JSON.stringify({ error: 'Failed to fetch products' }), {
//         status: 500, // 500 for an internal server error
//         headers: { 'Content-Type': 'application/json' },
//     });
// }
// }

// async function updateProduct(req: IncomingMessage, res: ServerResponse) {
//     try {

//         const { id, name, description, status } = JSON.parse(body);

//         const product = await prisma.product.update({
//             where: { id: parseInt(id, 10) },
//             data: {
//                 name,
//                 description,
//                 status,
//             },
//         });

//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.end(JSON.stringify(product));
//     } catch (error) {
// return new Response(JSON.stringify({ error: 'Failed to update products' }), {
//     status: 500, // 500 for an internal server error
//     headers: { 'Content-Type': 'application/json' },
//   });
//     }
// }

// async function deleteProduct(req: IncomingMessage, res: ServerResponse, id: string) {
//     try {
//         await prisma.product.delete({
//             where: { id: parseInt(id, 10) },
//         });

//         res.statusCode = 204;
//         res.end();
//     } catch (error) {
// return new Response(JSON.stringify({ error: 'Failed to delete products' }), {
//     status: 500, // 500 for an internal server error
//     headers: { 'Content-Type': 'application/json' },
//   });
//     }
// }

export default { createProduct, getProducts }