export interface TranslationHint {
  wordHint: string;
  grammarHint: string;
  generalHint: string;
  translationHint?: string;
}

export enum HintType {
  WORD = 'word',
  GRAMMAR = 'grammar',
  BOTH = 'both',
  TRANSLATION = 'translation',
}
