-- This is an empty migration.

-- Преобразование значений mastery из процентов (0-100) в десятичный формат (0-1)

-- Обновление значений в таблице UserWordProgress
UPDATE "UserWordProgress"
SET "mastery" = "mastery" / 100
WHERE "mastery" > 1;

-- Обновление значений в таблице UserGrammarTopicProgress
UPDATE "UserGrammarTopicProgress"
SET "mastery" = "mastery" / 100
WHERE "mastery" > 1;

-- Проверка, чтобы все значения были в диапазоне от 0 до 1
UPDATE "UserWordProgress"
SET "mastery" = 1
WHERE "mastery" > 1;

UPDATE "UserWordProgress"
SET "mastery" = 0
WHERE "mastery" < 0;

UPDATE "UserGrammarTopicProgress"
SET "mastery" = 1
WHERE "mastery" > 1;

UPDATE "UserGrammarTopicProgress"
SET "mastery" = 0
WHERE "mastery" < 0;