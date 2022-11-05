/*
  Warnings:

  - You are about to drop the column `note` on the `Movies` table. All the data in the column will be lost.
  - You are about to drop the column `originTitle` on the `Movies` table. All the data in the column will be lost.
  - You are about to drop the column `postingDate` on the `Movies` table. All the data in the column will be lost.
  - Added the required column `originalTitle` to the `Movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `releaseDate` to the `Movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score` to the `Movies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movies" DROP COLUMN "note",
DROP COLUMN "originTitle",
DROP COLUMN "postingDate",
ADD COLUMN     "originalTitle" TEXT NOT NULL,
ADD COLUMN     "releaseDate" TEXT NOT NULL,
ADD COLUMN     "score" INTEGER NOT NULL;
