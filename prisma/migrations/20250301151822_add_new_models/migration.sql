-- CreateEnum
CREATE TYPE "StudyStatus" AS ENUM ('learning', 'learned', 'review');

-- AlterTable
ALTER TABLE "Word" ADD COLUMN     "russianTranslation" TEXT;

-- CreateTable
CREATE TABLE "Sentence" (
    "id" SERIAL NOT NULL,
    "englishSentence" TEXT NOT NULL,
    "russianTranslation" TEXT NOT NULL,
    "grammarTopicId" INTEGER NOT NULL,
    "wordId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sentence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrammarTopic" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GrammarTopic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserWordProgress" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "wordId" INTEGER NOT NULL,
    "studyStatus" "StudyStatus" NOT NULL DEFAULT 'learning',
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastStudied" TIMESTAMP(3),
    "nextReviewDate" TIMESTAMP(3),
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "easinessFactor" DOUBLE PRECISION NOT NULL DEFAULT 2.5,
    "interval" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "UserWordProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGrammarTopicProgress" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "grammarTopicId" INTEGER NOT NULL,
    "studyStatus" "StudyStatus" NOT NULL DEFAULT 'learning',
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastStudied" TIMESTAMP(3),
    "nextReviewDate" TIMESTAMP(3),
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "easinessFactor" DOUBLE PRECISION NOT NULL DEFAULT 2.5,
    "interval" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "UserGrammarTopicProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSentenceProgress" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "sentenceId" INTEGER NOT NULL,
    "studyStatus" "StudyStatus" NOT NULL DEFAULT 'learning',
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastStudied" TIMESTAMP(3),
    "nextReviewDate" TIMESTAMP(3),
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "easinessFactor" DOUBLE PRECISION NOT NULL DEFAULT 2.5,
    "interval" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "UserSentenceProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserWordProgress_userId_wordId_key" ON "UserWordProgress"("userId", "wordId");

-- CreateIndex
CREATE UNIQUE INDEX "UserGrammarTopicProgress_userId_grammarTopicId_key" ON "UserGrammarTopicProgress"("userId", "grammarTopicId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSentenceProgress_userId_sentenceId_key" ON "UserSentenceProgress"("userId", "sentenceId");

-- AddForeignKey
ALTER TABLE "Sentence" ADD CONSTRAINT "Sentence_grammarTopicId_fkey" FOREIGN KEY ("grammarTopicId") REFERENCES "GrammarTopic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sentence" ADD CONSTRAINT "Sentence_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWordProgress" ADD CONSTRAINT "UserWordProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWordProgress" ADD CONSTRAINT "UserWordProgress_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGrammarTopicProgress" ADD CONSTRAINT "UserGrammarTopicProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGrammarTopicProgress" ADD CONSTRAINT "UserGrammarTopicProgress_grammarTopicId_fkey" FOREIGN KEY ("grammarTopicId") REFERENCES "GrammarTopic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSentenceProgress" ADD CONSTRAINT "UserSentenceProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSentenceProgress" ADD CONSTRAINT "UserSentenceProgress_sentenceId_fkey" FOREIGN KEY ("sentenceId") REFERENCES "Sentence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
