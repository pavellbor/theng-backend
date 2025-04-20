-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "usedGrammarHint" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "usedWordHint" BOOLEAN NOT NULL DEFAULT false;
