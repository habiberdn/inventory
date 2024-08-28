import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export const createCategory = async (req: Request): Promise<Response> => {
    try {
        let newPath: string;

        const { category_name, parentId } = await req.json();

        if (!category_name) {
            return new Response(
                JSON.stringify({ error: 'category_name is required' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        if (parentId) {
            const parentCategory = await prisma.category.findUnique({
                where: { id: parseInt(parentId) }
            });

            if (!parentCategory) {
                return new Response(
                    JSON.stringify({ error: 'Parent category not found' }),
                    { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
                );
            }

            newPath = `${parentCategory.path}.${parentId}`;
        } else {
            // This is a root category (no parent)
            const maxRootIdResult = await prisma.$queryRaw<{ max_root_id: number }[]>`
                SELECT COALESCE(MAX(CAST(SUBSTRING(path FROM '^[0-9]+') AS INTEGER)), 0) + 1 AS max_root_id
                FROM "Category"
                WHERE path ~ '^[0-9]+$'
            `;

            // If no records are present, default to 1
            const maxRootId = maxRootIdResult.length > 0 ? maxRootIdResult[0].max_root_id : 1;
            newPath = `${maxRootId}`;
        }

        // Create the new category
        const newCategory = await prisma.category.create({
            data: {
                category_name: category_name,
                path: newPath,
            }
        });

        return new Response(JSON.stringify({ message: 'Category created successfully', category: newCategory }), {
            status: 201,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error creating category:', error);
        return new Response(
            JSON.stringify({ error: 'Error creating category' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
};

export const getAllCategory = async (req: Request): Promise<Response | undefined> => {
    const categoryData = await prisma.category.findMany();
    return new Response(JSON.stringify(categoryData), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
}
