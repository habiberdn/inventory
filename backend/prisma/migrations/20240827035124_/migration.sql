/*
  Warnings:

  - A unique constraint covering the columns `[product]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `product` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_category_name_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "product" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_product_key" ON "Category"("product");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_product_fkey" FOREIGN KEY ("product") REFERENCES "Product"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
