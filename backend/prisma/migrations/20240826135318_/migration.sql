/*
  Warnings:

  - A unique constraint covering the columns `[category_name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category_name` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_path_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "category_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_category_name_key" ON "Category"("category_name");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_category_name_fkey" FOREIGN KEY ("category_name") REFERENCES "Product"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
