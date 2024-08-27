/*
  Warnings:

  - You are about to drop the column `product` on the `Category` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[category_name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[category_name]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category_name` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_product_fkey";

-- DropIndex
DROP INDEX "Category_product_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "product";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "category_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_category_name_key" ON "Category"("category_name");

-- CreateIndex
CREATE UNIQUE INDEX "Product_category_name_key" ON "Product"("category_name");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_category_name_fkey" FOREIGN KEY ("category_name") REFERENCES "Category"("category_name") ON DELETE RESTRICT ON UPDATE CASCADE;
