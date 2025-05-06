-- Округление значений mastery до двух знаков после запятой
-- Это обеспечит единообразие данных и улучшит производительность

-- Округляем значения mastery в таблице UserWordProgress
UPDATE "UserWordProgress"
SET "mastery" = ROUND("mastery" * 100) / 100
WHERE TRUE;

-- Округляем значения mastery в таблице UserGrammarTopicProgress
UPDATE "UserGrammarTopicProgress"
SET "mastery" = ROUND("mastery" * 100) / 100
WHERE TRUE; 