-- CreateEnum
CREATE TYPE "Category" AS ENUM ('MUSIC', 'FILM', 'HISTORY', 'SCIENCE');

-- CreateTable
CREATE TABLE "Fact" (
    "id" SERIAL NOT NULL,
    "category" "Category" NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fact_pkey" PRIMARY KEY ("id")
);
