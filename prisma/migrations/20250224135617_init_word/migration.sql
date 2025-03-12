-- CreateEnum
CREATE TYPE "PartOfSpeech" AS ENUM ('noun', 'verb', 'adjective', 'adverb', 'pronoun', 'preposition', 'conjunction', 'interjection', 'determiner', 'auxiliaryVerb', 'modalVerb', 'article', 'numeral', 'participle', 'gerund');

-- CreateEnum
CREATE TYPE "CEFRLevel" AS ENUM ('A1', 'A2', 'B1', 'B2', 'C1', 'C2');

-- CreateTable
CREATE TABLE "Word" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "partOfSpeech" "PartOfSpeech",
    "cefrLevel" "CEFRLevel",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Word_word_partOfSpeech_key" ON "Word"("word", "partOfSpeech");
