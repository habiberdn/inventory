/*
  Warnings:

  - You are about to drop the column `prize` on the `Product` table. All the data in the column will be lost.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "prize",
ADD COLUMN     "price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Variant" ADD COLUMN     "parentId" INTEGER;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Variant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
