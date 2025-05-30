/*
  Warnings:

  - Made the column `sessionCartId` on table `Cart` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Cart" ALTER COLUMN "sessionCartId" SET NOT NULL;
