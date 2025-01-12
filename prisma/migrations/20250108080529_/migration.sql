/*
  Warnings:

  - You are about to drop the column `completed` on the `todos` table. All the data in the column will be lost.
  - You are about to alter the column `title` on the `todos` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE "todos" DROP COLUMN "completed",
ADD COLUMN     "Status" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(191),
ALTER COLUMN "Description" DROP NOT NULL;
