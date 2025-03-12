/*
  Warnings:

  - You are about to drop the column `studyStatus` on the `UserGrammarTopicProgress` table. All the data in the column will be lost.
  - You are about to drop the column `nextReviewDate` on the `UserSentenceProgress` table. All the data in the column will be lost.
  - You are about to drop the column `reviewCount` on the `UserSentenceProgress` table. All the data in the column will be lost.
  - You are about to drop the column `studyStatus` on the `UserSentenceProgress` table. All the data in the column will be lost.
  - You are about to drop the column `studyStatus` on the `UserWordProgress` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserGrammarTopicProgress" DROP COLUMN "studyStatus";

-- AlterTable
ALTER TABLE "UserSentenceProgress" DROP COLUMN "nextReviewDate",
DROP COLUMN "reviewCount",
DROP COLUMN "studyStatus",
ADD COLUMN     "isCorrect" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "UserWordProgress" DROP COLUMN "studyStatus";

-- DropEnum
DROP TYPE "StudyStatus";
