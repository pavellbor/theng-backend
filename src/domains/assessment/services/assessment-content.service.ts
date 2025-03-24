/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, NotFoundException } from '@nestjs/common';
import { AssessmentSentence } from '../interfaces/assessment-sentence.interface';
import { AssessmentSentenceWithId } from '../interfaces/assessment-sentence.interface';
import * as assessmentSentencesData from '../data/assessment-sentences.json';
import { CEFRLevel } from '@prisma/client';

@Injectable()
export class AssessmentContentService {
  private assessmentSentences: AssessmentSentence[] = [];
  private sentencesMap: Map<number, AssessmentSentenceWithId> = new Map();

  constructor() {
    this.initializeSentences();
  }

  getNextSentence(
    level: CEFRLevel,
    userSentencesIds: number[],
  ): AssessmentSentenceWithId {
    const sentencesForLevel = Array.from(this.sentencesMap.values()).filter(
      (s) => s.cefrLevel === level && !userSentencesIds.includes(s.id),
    );

    if (sentencesForLevel.length === 0) {
      throw new NotFoundException('No sentences for this level');
    }

    const randomSentence =
      sentencesForLevel[Math.floor(Math.random() * sentencesForLevel.length)];

    return randomSentence;
  }

  getSentenceById(id: number): AssessmentSentenceWithId {
    const sentence = this.sentencesMap.get(id);

    if (!sentence) {
      throw new NotFoundException('Sentence not found');
    }

    return sentence;
  }

  private initializeSentences(): void {
    this.assessmentSentences = (assessmentSentencesData as any)
      .assessmentSentences as AssessmentSentence[];

    this.assessmentSentences.forEach((sentence, i) => {
      const id = i + 1;

      this.sentencesMap.set(id, {
        id,
        ...sentence,
      });
    });
  }
}
