import { AssessmentProgress } from './assessment-progress.interface';
import { AssessmentSentenceWithId } from './assessment-sentence.interface';

export interface AssessmentStart {
  sessionId: string;
  progress: AssessmentProgress;
  sentence: AssessmentSentenceWithId;
  isCompleted: boolean;
}
