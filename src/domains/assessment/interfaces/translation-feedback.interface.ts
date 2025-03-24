export interface TranslationFeedback {
  overall: {
    isCorrect: boolean;
    feedback: string;
  };
  word: {
    isCorrect: boolean;
    feedback: string;
  };
  grammarTopic: {
    isCorrect: boolean;
    feedback: string;
  };
}
