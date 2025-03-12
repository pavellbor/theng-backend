/*
  Warnings:

  - You are about to drop the column `easinessFactor` on the `UserGrammarTopicProgress` table. All the data in the column will be lost.
  - You are about to drop the column `interval` on the `UserGrammarTopicProgress` table. All the data in the column will be lost.
  - You are about to drop the column `isFavorite` on the `UserGrammarTopicProgress` table. All the data in the column will be lost.
  - You are about to drop the column `easinessFactor` on the `UserSentenceProgress` table. All the data in the column will be lost.
  - You are about to drop the column `interval` on the `UserSentenceProgress` table. All the data in the column will be lost.
  - You are about to drop the column `isFavorite` on the `UserSentenceProgress` table. All the data in the column will be lost.
  - You are about to drop the column `easinessFactor` on the `UserWordProgress` table. All the data in the column will be lost.
  - You are about to drop the column `interval` on the `UserWordProgress` table. All the data in the column will be lost.
  - You are about to drop the column `isFavorite` on the `UserWordProgress` table. All the data in the column will be lost.
  - You are about to drop the column `russianTranslation` on the `Word` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserGrammarTopicProgress" DROP COLUMN "easinessFactor",
DROP COLUMN "interval",
DROP COLUMN "isFavorite";

-- AlterTable
ALTER TABLE "UserSentenceProgress" DROP COLUMN "easinessFactor",
DROP COLUMN "interval",
DROP COLUMN "isFavorite";

-- AlterTable
ALTER TABLE "UserWordProgress" DROP COLUMN "easinessFactor",
DROP COLUMN "interval",
DROP COLUMN "isFavorite";

-- AlterTable
ALTER TABLE "Word" DROP COLUMN "russianTranslation";
