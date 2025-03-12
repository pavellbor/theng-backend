/*
  Warnings:

  - Added the required column `category` to the `GrammarTopic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cefrLevel` to the `GrammarTopic` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GrammarTopicCategory" AS ENUM ('Verbs & tenses', 'Clauses & questions', 'Modal verbs', 'Nonfinite verbs', 'Nouns', 'Adjectives', 'Adverbs', 'Other parts of speech');

-- AlterTable
ALTER TABLE "GrammarTopic" ADD COLUMN     "category" "GrammarTopicCategory" NOT NULL,
ADD COLUMN     "cefrLevel" "CEFRLevel" NOT NULL;
