/*
  Warnings:

  - A unique constraint covering the columns `[content]` on the table `Fact` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Fact_content_key" ON "Fact"("content");
