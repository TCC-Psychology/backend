/*
  Warnings:

  - You are about to drop the column `segment` on the `SegmentOfActivity` table. All the data in the column will be lost.
  - You are about to drop the column `tag` on the `TargetAudience` table. All the data in the column will be lost.
  - Added the required column `title` to the `SegmentOfActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `TargetAudience` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SegmentOfActivity" DROP COLUMN "segment",
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TargetAudience" DROP COLUMN "tag",
ADD COLUMN     "title" TEXT NOT NULL;
