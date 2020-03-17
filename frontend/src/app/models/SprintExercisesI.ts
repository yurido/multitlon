import {SprintDate} from './SprintDate';
import {Exercise} from './exercise';

export interface SprintExercisesI {
  getSprintDate(): SprintDate;
  getExercises(): Exercise[];
}
