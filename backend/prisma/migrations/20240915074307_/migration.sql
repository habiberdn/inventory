/*
  Warnings:

  - You are about to drop the column `amount` on the `VariantValue` table. All the data in the column will be lost.
  - You are about to drop the column `codeVariant` on the `VariantValue` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `VariantValue` table. All the data in the column will be lost.
  - You are about to drop the column `secondVariant` on the `VariantValue` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Variant" ADD COLUMN     "secondVariant" TEXT;

-- AlterTable
ALTER TABLE "VariantValue" DROP COLUMN "amount",
DROP COLUMN "codeVariant",
DROP COLUMN "price",
DROP COLUMN "secondVariant";

-- CreateTable
CREATE TABLE "SecondVariantValue" (
    "id" SERIAL NOT NULL,
    "variantValue" TEXT NOT NULL,
    "VariantId" INTEGER NOT NULL,

    CONSTRAINT "SecondVariantValue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stock" (
    "id" SERIAL NOT NULL,
    "price" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "codeVariant" TEXT NOT NULL,
    "VariantId" INTEGER NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SecondVariantValue_id_key" ON "SecondVariantValue"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Stock_id_key" ON "Stock"("id");

-- AddForeignKey
ALTER TABLE "SecondVariantValue" ADD CONSTRAINT "SecondVariantValue_VariantId_fkey" FOREIGN KEY ("VariantId") REFERENCES "Variant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_VariantId_fkey" FOREIGN KEY ("VariantId") REFERENCES "Variant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
