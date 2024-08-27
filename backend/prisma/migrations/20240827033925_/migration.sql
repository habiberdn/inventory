/*
  Warnings:

  - You are about to drop the column `product` on the `Category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_product_fkey";

-- DropIndex
DROP INDEX "Category_product_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "product";

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_category_name_fkey" FOREIGN KEY ("category_name") REFERENCES "Product"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
