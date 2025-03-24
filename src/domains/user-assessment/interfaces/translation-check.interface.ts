import { AssessmentProgress } from './assessment-progress.interface';
import { TranslationFeedback } from './translation-feedback.interface';
import { AssessmentSentenceWithId } from './assessment-sentence.interface';

export interface TranslationCheck {
  isCorrect: boolean;
  progress: AssessmentProgress;
  nextSentence: AssessmentSentenceWithId | null;
  feedback: TranslationFeedback;
  isCompleted: boolean;
}
