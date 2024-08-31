import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export const createCategory = async (
  category_name: string,
  level: number,
  parentId?: number
) => {
  try {
    const newCategory = await prisma.category.create({
      data: {
        category_name,
        level,
        parentId,
      },
    });
    return newCategory;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

export const getAllCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      where: { parentId: null }, // Start with top-level categories
      include: {
        subcategories: {
          include: {
            subcategories: {
              include: {
                subcategories: true, // Fetch multiple levels of subcategories recursively
              },
            },
          },
        },
      },
    });
    return new Response(JSON.stringify(categories), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      status: 200,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ message: 'Error fetching data' }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders }, status: 500 }
    );
  }
}

export const getCategoryById = async (id: number) => {
  try {
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        subcategories: true,
      },
    });
    return category;
  } catch (error) {
    console.error('Error fetching category by ID:', error);
    throw error;
  }
};

export const updateCategory = async (
  id: number,
  category_name: string,
  level: number,
  parentId?: number
) => {
  try {
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        category_name,
        level,
        parentId,
      },
    });
    return updatedCategory;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

export const deleteCategory = async (id: number) => {
  try {
    const deletedCategory = await prisma.category.delete({
      where: { id },
    });
    return deletedCategory;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};
