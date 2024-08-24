/*
  Warnings:

  - The values [Outdated] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `category` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('Pending', 'OK', 'Expired');
ALTER TABLE "Product" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
COMMIT;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "category" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Photo" (
    "id" SERIAL NOT NULL,
    "photo_name" TEXT NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Photo_id_key" ON "Photo"("id");

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_photo_name_fkey" FOREIGN KEY ("photo_name") REFERENCES "Product"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
