-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "isGrammarRepetition" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isWordRepetition" BOOLEAN NOT NULL DEFAULT false;
