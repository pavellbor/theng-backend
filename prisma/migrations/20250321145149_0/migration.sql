-- DropForeignKey
ALTER TABLE "Sentence" DROP CONSTRAINT "Sentence_grammarTopicId_fkey";

-- DropForeignKey
ALTER TABLE "Sentence" DROP CONSTRAINT "Sentence_wordId_fkey";

-- AddForeignKey
ALTER TABLE "Sentence" ADD CONSTRAINT "Sentence_grammarTopicId_fkey" FOREIGN KEY ("grammarTopicId") REFERENCES "GrammarTopic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sentence" ADD CONSTRAINT "Sentence_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE CASCADE ON UPDATE CASCADE;
