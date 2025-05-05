import { GenerateSentenceParams } from '../interfaces/generate-sentence-params.interface';
import { PromptTemplate } from '../interfaces/prompt-template.interface';

export const sentenceGenerationPrompt: PromptTemplate<GenerateSentenceParams> =
  {
    version: '1.14.0',
    template: `Создай одно образцовое учебное предложение на английском языке и его перевод.

**Параметры:**
- Слово: "{{word}}" ({{partOfSpeech}}, перевод: {{russianTranslation}})
- Грамматика: "{{grammarTopic}}"
- Уровень CEFR: {{cefrLevel}}

**КРИТИЧЕСКИЕ ТРЕБОВАНИЯ:**
- СТРОГО используй "{{word}}" ТОЛЬКО как {{partOfSpeech}}, а НЕ другую часть речи
- Используй слово в ТИПИЧНОМ сочетании, естественном для указанной части речи
- Грамматика "{{grammarTopic}}" должна быть ЦЕНТРАЛЬНОЙ в предложении
- Соответствуй сложности уровня {{cefrLevel}}
- Создавай РЕАЛИСТИЧНЫЙ контекст с конкретными деталями

**ПРОЦЕСС:**
1. ВЫБЕРИ типичное сочетание для "{{word}}" как {{partOfSpeech}}
2. ОПРЕДЕЛИ ключевые элементы грамматики "{{grammarTopic}}"
3. СОЗДАЙ предложение соответствующее уровню {{cefrLevel}}
4. ПРОВЕРЬ, что слово используется именно как {{partOfSpeech}}
5. ПРОВЕРЬ, что грамматика демонстрируется явно
6. СОЗДАЙ естественный перевод на русский язык

**Типичные сочетания по частям речи:**
- Прилагательное "key": key information, key role, key factor, key person, key question
- Наречие "home": всегда с предлогом → at home
- Глаголы с предлогами: look at (смотреть на), look for (искать)
- Многозначные слова: проверяй, что используешь в значении соответствующем требуемой части речи

**Правила для частей речи:**
- noun: предмет/понятие, о котором идет речь
- verb: действие в нужной форме согласно грамматике
- adjective: описывает существительное
- adverb: модифицирует глагол, прилагательное или наречие
- preposition: показывает отношения между словами
- pronoun: заменяет существительное
- conjunction: соединяет слова или предложения

**Уровень {{cefrLevel}}:**

{{#if cefrLevel === "A0"}}
- 4-5 слов, простейшая структура (подлежащее + сказуемое)
- Только базовая лексика (приветствия, числа, цвета)
- Контекст: знакомство, семья, класс, еда
{{/if}}

{{#if cefrLevel === "A1"}}
- 5-7 слов, простая структура (подлежащее + сказуемое + дополнение)
- Только простая лексика повседневного общения
- Контекст: семья, дом, еда, хобби, распорядок дня, школа, друзья
{{/if}}

{{#if cefrLevel === "A2"}}
- 6-9 слов, возможны простые союзы
- Базовая лексика + 1-2 слова следующего уровня
- Контекст: работа, путешествия, покупки, погода, транспорт
{{/if}}

{{#if cefrLevel === "B1"}}
- 8-12 слов, составная структура с союзами
- Разнообразная лексика с некоторыми абстрактными понятиями
- Контекст: работа, учеба, досуг, планы, эмоции, мнения, технологии
{{/if}}

{{#if cefrLevel === "B2"}}
- 10-15 слов, сложная структура с придаточными
- Специализированная лексика
- Контекст: общественные вопросы, культура, технологии, наука, политика
{{/if}}

{{#if cefrLevel === "C1Plus"}}
- 12-20 слов, сложноподчиненные предложения
- Богатая лексика с нюансами значения, идиомы и термины
- Контекст: профессиональные темы, философия, этика, международные отношения
{{/if}}

**Примеры правильных предложений:**
- A1 (noun "book", "Prepositions of Place"): "My book is on the desk."
- A1 (verb "read", "Present Simple"): "She reads books every day."
- A1 (adjective "key", "Articles"): "This is a key question for students."
- A1 (adverb "home", "Modal Verbs"): "Children can study at home during weekends."
- A1 (preposition "to", "There Is/Are"): "There are toys to play with in the box."
- A1 (pronoun "everything", "Would Like"): "I would like everything on the menu."

**Примеры ошибок (ИЗБЕГАТЬ):**
- "The key is on the table." → ошибка: "key" как существительное, не прилагательное
- "There is one key to the door." → ошибка: "key" как существительное, не прилагательное
- "My brother can play games home." → ошибка: "home" без "at"
- "Water is key in the bottle." → ошибка: странный контекст
- "She read a book yesterday." → ошибка: Past Simple вместо Present Simple

**Грамматические правила - примеры:**
- Present Simple: "She walks to school every day."
- Past Simple for Irregular Verbs: "I saw a movie yesterday."
- Prepositions of Place: "The cat is under the table."
- Ability - Can/Can't: "He can swim, but he can't ride a bike."
- Irregular Plural Nouns: "Children love to play with their mice."
- There Is/Are: "There are five people in the room."
- Would Like: "I would like some water, please."
- Prepositions of Time: "We have class in the morning."

**Требования к переводу:**
- Естественность русской речи важнее дословности
- Неопределенный артикль (a/an) обычно НЕ переводится как "один/одна"
- Используй идиоматичные выражения русского языка
- Перестраивай предложение, если нужно для естественности
- Примеры удачного перевода:
  * "This is a key decision." → "Это важное решение."
  * "Children name their toys." → "Дети дают имена своим игрушкам."
  * "There is a pencil on the desk." → "На столе лежит карандаш."

**Формат ответа (только JSON):**
\`\`\`json
{
  "englishSentence": "Естественное английское предложение с ключевым словом и грамматикой",
  "russianTranslation": "Естественный перевод на русский язык",
  "literalTranslation": "Дословный перевод, показывающий грамматическую структуру"
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
