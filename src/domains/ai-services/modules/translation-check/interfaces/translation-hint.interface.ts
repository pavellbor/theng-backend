export interface TranslationHint {
  wordHint: string;
  grammarHint: string;
  generalHint: string;
}

export enum HintType {
  WORD = 'word',
  GRAMMAR = 'grammar',
  BOTH = 'both',
}
