-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_imageId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "imageId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
