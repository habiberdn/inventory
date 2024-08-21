-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Pending', 'OK', 'Expired', 'Outdated');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Customer', 'Admin');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "field" TEXT,
    "description" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'Customer',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stock" (
    "id" SERIAL NOT NULL,
    "product_name" TEXT NOT NULL,
    "supplier" TEXT NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "expired_date" TIMESTAMP(3),
    "date_buy" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Stock_id_key" ON "Stock"("id");

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_product_name_fkey" FOREIGN KEY ("product_name") REFERENCES "Product"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
