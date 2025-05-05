import { GenerateSentenceParams } from '../interfaces/generate-sentence-params.interface';
import { PromptTemplate } from '../interfaces/prompt-template.interface';

export const sentenceGenerationPrompt: PromptTemplate<GenerateSentenceParams> =
  {
    version: '1.24.0',
    template: `Создай образцовое учебное предложение для перевода с русского на английский язык.

**ЗАДАЧА**:
Создай ОДНО предложение на русском языке с использованием заданной грамматики и слова "{{russianTranslation}}" ({{partOfSpeech}}). Переведи его на английский, используя слово "{{word}}" ({{partOfSpeech}}).

**ПАРАМЕТРЫ**:
- Слово: "{{word}}" ({{partOfSpeech}}, перевод: {{russianTranslation}})
- Грамматика: "{{grammarTopic}}"
- Уровень CEFR: {{cefrLevel}}

**КЛЮЧЕВЫЕ ТРЕБОВАНИЯ**:
- В АНГЛИЙСКОМ используй "{{word}}" СТРОГО как {{partOfSpeech}}
- В РУССКОМ используй "{{russianTranslation}}" СТРОГО как {{partOfSpeech}}
- ТОЧНО соблюдай части речи в обоих языках
- Предложение должно демонстрировать грамматику "{{grammarTopic}}"
- ИЗБЕГАЙ бессмысленного повторения слов
- СОВЕТЫ ПО ПЕРЕВОДУ должны быть ТОЛЬКО на РУССКОМ языке

**ВАРИАТИВНОСТЬ ПРЕДЛОЖЕНИЙ**:
- СОЗДАВАЙ РАЗНООБРАЗНЫЕ предложения - не повторяй шаблоны и структуры
- ИСПОЛЬЗУЙ разные типы предложений: утвердительные, отрицательные, вопросительные
- НАЧИНАЙ предложения по-разному: с подлежащего, обстоятельства времени/места, etc.
- ВАРЬИРУЙ КОНТЕКСТЫ: быт, учеба, работа, путешествия, хобби, природа
- ПРИМЕНЯЙ различные лексические конструкции для выражения одних и тех же идей

**ПРОЦЕСС**:
1. Создай ОРИГИНАЛЬНОЕ русское предложение уровня {{cefrLevel}} с "{{russianTranslation}}" как {{partOfSpeech}}
2. Переведи на английский, используя "{{word}}" как ту же часть речи
3. Проверь естественность обоих предложений и соответствие части речи
4. Добавь полезную подсказку на РУССКОМ языке о ключевой грамматике

**ПРОВЕРЬ**:
- Часть речи {{partOfSpeech}} соблюдается в обоих языках
- Грамматика "{{grammarTopic}}" явно демонстрируется
- Предлоги и артикли используются правильно
- Перевод звучит естественно на обоих языках 
- Подсказка содержит только корректную информацию
- Предложение уникально и не повторяет уже использованные шаблоны

**УРОВЕНЬ {{cefrLevel}}**:
{{#if cefrLevel === "A0"}}
4-5 слов, простейшая структура, базовая лексика
{{/if}}
{{#if cefrLevel === "A1"}}
5-7 слов, простая структура, повседневная лексика
{{/if}}
{{#if cefrLevel === "A2"}}
6-9 слов, возможны простые союзы
{{/if}}
{{#if cefrLevel === "B1"}}
8-12 слов, составная структура с союзами
{{/if}}
{{#if cefrLevel === "B2"}}
10-15 слов, сложная структура с придаточными
{{/if}}
{{#if cefrLevel === "C1Plus"}}
12-20 слов, сложноподчиненные предложения, богатая лексика
{{/if}}

**ФОРМАТ ОТВЕТА (ТОЛЬКО JSON)**:
\`\`\`json
{
  "russianTranslation": "Русское предложение для перевода",
  "englishSentence": "Правильный английский перевод",
  "translationTips": "Подсказка на РУССКОМ языке о ключевой грамматике",
  "literalTranslation": "Дословный перевод для понимания структуры"
}
\`\`\``,

    render: (params: GenerateSentenceParams): string => {
      let resultString = sentenceGenerationPrompt.template;

      // Заменяем все плейсхолдеры их значениями
      Object.entries(params).forEach(([key, value]) => {
        resultString = resultString.replace(
          new RegExp(`{{${key}}}`, 'g'),
          value,
        );
      });

      // Обрабатываем условные блоки для конкретного уровня CEFR
      const cefrLevel = params.cefrLevel;
      const cefrLevels = ['A0', 'A1', 'A2', 'B1', 'B2', 'C1Plus'];

      cefrLevels.forEach((level) => {
        const ifPattern = new RegExp(
          `{{#if cefrLevel === "${level}"}}([\\s\\S]*?){{/if}}`,
          'g',
        );

        if (level === cefrLevel) {
          // Если это текущий уровень, удаляем теги условия, но оставляем содержимое
          resultString = resultString.replace(ifPattern, (_match, content) => {
            return String(content);
          });
        } else {
          // Если это не текущий уровень, удаляем весь блок
          resultString = resultString.replace(ifPattern, '');
        }
      });

      return resultString;
    },
  };
