/*
  Warnings:

  - The values [C1,C2] on the enum `CEFRLevel` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CEFRLevel_new" AS ENUM ('A1', 'A2', 'B1', 'B2', 'C1+');
ALTER TABLE "User" ALTER COLUMN "cefrLevel" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "cefrLevel" TYPE "CEFRLevel_new" USING ("cefrLevel"::text::"CEFRLevel_new");
ALTER TABLE "Word" ALTER COLUMN "cefrLevel" TYPE "CEFRLevel_new" USING ("cefrLevel"::text::"CEFRLevel_new");
ALTER TABLE "Sentence" ALTER COLUMN "cefrLevel" TYPE "CEFRLevel_new" USING ("cefrLevel"::text::"CEFRLevel_new");
ALTER TABLE "GrammarTopic" ALTER COLUMN "cefrLevel" TYPE "CEFRLevel_new" USING ("cefrLevel"::text::"CEFRLevel_new");
ALTER TYPE "CEFRLevel" RENAME TO "CEFRLevel_old";
ALTER TYPE "CEFRLevel_new" RENAME TO "CEFRLevel";
DROP TYPE "CEFRLevel_old";
ALTER TABLE "User" ALTER COLUMN "cefrLevel" SET DEFAULT 'A1';
COMMIT;
