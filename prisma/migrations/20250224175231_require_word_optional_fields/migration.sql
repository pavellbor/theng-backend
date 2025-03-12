/*
  Warnings:

  - Made the column `partOfSpeech` on table `Word` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cefrLevel` on table `Word` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Word" ALTER COLUMN "partOfSpeech" SET NOT NULL,
ALTER COLUMN "cefrLevel" SET NOT NULL;
