import { TranslationFeedback } from 'src/domains/ai-services/modules/translation-check/interfaces/translation-feedback.interface';
import { AssessmentProgress } from './assessment-progress.interface';
import { AssessmentSentenceWithId } from './assessment-sentence.interface';

export interface TranslationCheck {
  isCorrect: boolean;
  progress: AssessmentProgress;
  nextSentence: AssessmentSentenceWithId | null;
  feedback: TranslationFeedback;
  isCompleted: boolean;
}
