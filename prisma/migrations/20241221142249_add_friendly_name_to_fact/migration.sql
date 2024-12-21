/*
  Warnings:

  - A unique constraint covering the columns `[friendlyName]` on the table `Fact` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `friendlyName` to the `Fact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fact" ADD COLUMN     "friendlyName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Fact_friendlyName_key" ON "Fact"("friendlyName");
