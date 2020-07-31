import {SprintExercise} from './sprint.exercise';

export class SprintExerciseList {
  private sprintExercises: SprintExercise[] = [];

  constructor() {
  }

  public getSprintExercises(): SprintExercise[] {
    return this.sprintExercises;
  }

}
