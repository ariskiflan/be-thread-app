/*
  Warnings:

  - You are about to drop the column `image` on the `Thread` table. All the data in the column will be lost.
  - You are about to drop the `like` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "like" DROP CONSTRAINT "like_threadId_fkey";

-- DropForeignKey
ALTER TABLE "like" DROP CONSTRAINT "like_userId_fkey";

-- AlterTable
ALTER TABLE "Thread" DROP COLUMN "image";

-- DropTable
DROP TABLE "like";

-- CreateTable
CREATE TABLE "Like" (
    "threadId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("threadId","userId")
);

-- CreateTable
CREATE TABLE "threadImage" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "threadId" INTEGER NOT NULL,

    CONSTRAINT "threadImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "Thread"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "threadImage" ADD CONSTRAINT "threadImage_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "Thread"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
