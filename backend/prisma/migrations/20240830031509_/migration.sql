/*
  Warnings:

  - You are about to drop the column `path` on the `Category` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Category_path_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "path",
ADD COLUMN     "parentId" INTEGER;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
