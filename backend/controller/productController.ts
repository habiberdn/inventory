import { PrismaClient,Status } from "@prisma/client";
import type { MiddlewareProduct } from "../utils/type-utils";
import { AppError } from "../utils/appError";

const prisma = new PrismaClient();

const createProduct: MiddlewareProduct = async (req, res) => {
    try {
        const { name, description,category } = req.body;

        const product = await prisma.product.create({
            data: {
                name,
                description,
                status : req.body.status  as Status,
                category
            },
        });

        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(product));
    } catch (error) {
    }
}

const getProducts : MiddlewareProduct = async(req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(products));
    } catch (error) {
    }
}

const  getProductById : MiddlewareProduct = async(req, res) => {
    try {
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
    } catch (error) {
    }
}

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
//     }
// }