/*
  Warnings:

  - Made the column `lastStudied` on table `UserGrammarTopicProgress` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastStudied` on table `UserSentenceProgress` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastStudied` on table `UserWordProgress` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "UserGrammarTopicProgress" DROP CONSTRAINT "UserGrammarTopicProgress_grammarTopicId_fkey";

-- DropForeignKey
ALTER TABLE "UserGrammarTopicProgress" DROP CONSTRAINT "UserGrammarTopicProgress_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserSentenceProgress" DROP CONSTRAINT "UserSentenceProgress_sentenceId_fkey";

-- DropForeignKey
ALTER TABLE "UserSentenceProgress" DROP CONSTRAINT "UserSentenceProgress_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserWordProgress" DROP CONSTRAINT "UserWordProgress_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserWordProgress" DROP CONSTRAINT "UserWordProgress_wordId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastActive" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "UserGrammarTopicProgress" ADD COLUMN     "failureCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "mastery" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "successCount" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "lastStudied" SET NOT NULL,
ALTER COLUMN "lastStudied" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "UserSentenceProgress" ADD COLUMN     "grammarCorrect" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastTranslation" TEXT,
ADD COLUMN     "wordCorrect" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "lastStudied" SET NOT NULL,
ALTER COLUMN "lastStudied" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "UserWordProgress" ADD COLUMN     "failureCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "mastery" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "successCount" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "lastStudied" SET NOT NULL,
ALTER COLUMN "lastStudied" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "GrammarTopic_cefrLevel_category_idx" ON "GrammarTopic"("cefrLevel", "category");

-- CreateIndex
CREATE INDEX "Sentence_cefrLevel_idx" ON "Sentence"("cefrLevel");

-- CreateIndex
CREATE INDEX "Sentence_wordId_grammarTopicId_idx" ON "Sentence"("wordId", "grammarTopicId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "UserGrammarTopicProgress_userId_nextReviewDate_idx" ON "UserGrammarTopicProgress"("userId", "nextReviewDate");

-- CreateIndex
CREATE INDEX "UserGrammarTopicProgress_mastery_idx" ON "UserGrammarTopicProgress"("mastery");

-- CreateIndex
CREATE INDEX "UserSentenceProgress_userId_isCorrect_idx" ON "UserSentenceProgress"("userId", "isCorrect");

-- CreateIndex
CREATE INDEX "UserSentenceProgress_createdAt_idx" ON "UserSentenceProgress"("createdAt");

-- CreateIndex
CREATE INDEX "UserWordProgress_userId_nextReviewDate_idx" ON "UserWordProgress"("userId", "nextReviewDate");

-- CreateIndex
CREATE INDEX "UserWordProgress_mastery_idx" ON "UserWordProgress"("mastery");

-- CreateIndex
CREATE INDEX "Word_cefrLevel_idx" ON "Word"("cefrLevel");

-- AddForeignKey
ALTER TABLE "UserWordProgress" ADD CONSTRAINT "UserWordProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWordProgress" ADD CONSTRAINT "UserWordProgress_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGrammarTopicProgress" ADD CONSTRAINT "UserGrammarTopicProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGrammarTopicProgress" ADD CONSTRAINT "UserGrammarTopicProgress_grammarTopicId_fkey" FOREIGN KEY ("grammarTopicId") REFERENCES "GrammarTopic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSentenceProgress" ADD CONSTRAINT "UserSentenceProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSentenceProgress" ADD CONSTRAINT "UserSentenceProgress_sentenceId_fkey" FOREIGN KEY ("sentenceId") REFERENCES "Sentence"("id") ON DELETE CASCADE ON UPDATE CASCADE;
