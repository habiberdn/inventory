/*
  Warnings:

  - You are about to drop the column `amount` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - Added the required column `amount` to the `VariantValue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `VariantValue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "amount",
DROP COLUMN "price";

-- AlterTable
ALTER TABLE "VariantValue" ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL;
