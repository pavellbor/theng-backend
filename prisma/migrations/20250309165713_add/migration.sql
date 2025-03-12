/*
  Warnings:

  - Added the required column `cefrLevel` to the `Sentence` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sentence" ADD COLUMN     "cefrLevel" "CEFRLevel" NOT NULL;
