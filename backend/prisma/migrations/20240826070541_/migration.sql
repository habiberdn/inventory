/*
  Warnings:

  - You are about to drop the column `category_name` on the `Category` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[path]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_category_name_fkey";

-- DropIndex
DROP INDEX "Category_category_name_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "category_name";

-- CreateIndex
CREATE UNIQUE INDEX "Category_path_key" ON "Category"("path");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_path_fkey" FOREIGN KEY ("path") REFERENCES "Product"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
