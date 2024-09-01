import { PrismaClient } from "@prisma/client";
import { AppError } from "../utils/appError";

const prisma = new PrismaClient();

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const createVariantValue = async (req: Request): Promise<Response> => {
    try {
        const body = await req.json()
        const createData = await prisma.variantValue.create({
            data: {
                variantName: body.variantName,
                name: body.name
            }
        })
        return new Response(JSON.stringify(createData), {
            status: 201,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });

    } catch (err) {
        return new Response(JSON.stringify({ error: 'Failed to fetch variant value' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

}

const getAllVariantValue = async (): Promise<Response> => {
    try{
        const getAllData = await prisma.variantValue.findMany()
        return new Response(JSON.stringify(getAllData), {
            status: 201,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
    }catch(err){
        return new Response(JSON.stringify({ error: 'Failed to fetch variant value' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export default {createVariantValue,getAllVariantValue};