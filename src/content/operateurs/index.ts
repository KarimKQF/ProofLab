import { FOUNDATIONS } from './fondements';
import { SPECTRAL_LESSONS } from './spectre';
import { OPERATOR_APPLICATIONS } from './applications';
export type { OperatorLesson, OperatorQuestion, OperatorSource } from './types';

export const OPERATOR_LESSONS = [...FOUNDATIONS, ...SPECTRAL_LESSONS, ...OPERATOR_APPLICATIONS];
export const OPERATOR_LESSON_BY_ID = new Map(OPERATOR_LESSONS.map((lesson) => [lesson.id, lesson]));
