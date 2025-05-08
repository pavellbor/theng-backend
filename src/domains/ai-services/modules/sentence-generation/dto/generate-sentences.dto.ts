import { ApiProperty } from '@nestjs/swagger';
import { GenerateSentenceDto } from './generate-sentence.dto';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

export class GenerateSentencesDto {
  @ApiProperty({
    type: [GenerateSentenceDto],
    example: [
      {
        word: 'key',
        partOfSpeech: 'adjective',
        russianTranslation: 'ключевой',
        grammarTopic: 'Prepositions of Place',
        cefrLevel: 'A1',
      },
      {
        word: 'key',
        partOfSpeech: 'adjective',
        russianTranslation: 'ключевой',
        grammarTopic: 'Past Simple for Irregular Verbs',
        cefrLevel: 'A1',
      },
      {
        word: 'look',
        partOfSpeech: 'verb',
        russianTranslation: 'смотреть',
        grammarTopic: 'Present Simple',
        cefrLevel: 'A1',
      },
      {
        word: 'name',
        partOfSpeech: 'verb',
        russianTranslation: 'называть',
        grammarTopic: 'Irregular Plural Nouns',
        cefrLevel: 'A1',
      },
      {
        word: 'home',
        partOfSpeech: 'adverb',
        russianTranslation: 'дома',
        grammarTopic: "Ability - Can/Can't/Could/Couldn't",
        cefrLevel: 'A1',
      },
      {
        word: 'everything',
        partOfSpeech: 'pronoun',
        russianTranslation: 'все',
        grammarTopic: 'Would Like',
        cefrLevel: 'A1',
      },
      {
        word: 'to',
        partOfSpeech: 'preposition',
        russianTranslation: 'в',
        grammarTopic: 'There Is/Are',
        cefrLevel: 'A1',
      },
      {
        word: 'vegetable',
        partOfSpeech: 'noun',
        russianTranslation: 'овощ',
        grammarTopic: 'Prepositions of Time',
        cefrLevel: 'A1',
      },
      {
        word: 'text',
        partOfSpeech: 'noun',
        russianTranslation: 'текст',
        grammarTopic: 'Indefinite Article - A/An',
        cefrLevel: 'A1',
      },
      {
        word: 'far',
        partOfSpeech: 'adverb',
        russianTranslation: 'далеко',
        grammarTopic: 'Because Clauses',
        cefrLevel: 'A1',
      },
      {
        word: 'Tuesday',
        partOfSpeech: 'noun',
        russianTranslation: 'вторник',
        grammarTopic: 'Possessive Adjectives',
        cefrLevel: 'A1',
      },
      {
        word: 'welcome',
        partOfSpeech: 'noun',
        russianTranslation: 'приветствовать',
        grammarTopic: 'Prepositions of Time',
        cefrLevel: 'A1',
      },
      {
        word: 'aunt',
        partOfSpeech: 'noun',
        russianTranslation: 'тетя',
        grammarTopic: 'Present Continuous',
        cefrLevel: 'A1',
      },
      {
        word: 'north',
        partOfSpeech: 'adverb',
        russianTranslation: 'на север',
        grammarTopic: 'Irregular Plural Nouns',
        cefrLevel: 'A1',
      },
      {
        word: 'yesterday',
        partOfSpeech: 'noun',
        russianTranslation: 'вчера',
        grammarTopic: 'Prepositions of Time',
        cefrLevel: 'A1',
      },
      {
        word: 'change',
        partOfSpeech: 'noun',
        russianTranslation: 'перемена',
        grammarTopic: 'Prepositions of Time',
        cefrLevel: 'A1',
      },
      {
        word: 'different',
        partOfSpeech: 'adjective',
        russianTranslation: 'разный',
        grammarTopic: 'Questions - Closed',
        cefrLevel: 'A1',
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GenerateSentenceDto)
  payload: GenerateSentenceDto[];
}
