import {Serializable} from './serializable';
import {ExerciseStatistic} from './exercise.statistic';
import {Serializator} from './serializator';

export class SprintExerciseStatisticCalendar implements Serializable<SprintExerciseStatisticCalendar> {
  private exerciseStatistic: ExerciseStatistic[] = [];

  constructor() {
  }

  public getExerciseStatistic(): ExerciseStatistic[] {
    return this.exerciseStatistic;
  }

  deserialize(input: object): SprintExerciseStatisticCalendar {
    const serializator = new Serializator(SprintExerciseStatisticCalendar.name);
    const exerciseStatistic = serializator.getObjectProperty(input, 'exerciseStatistic');

    for (const i in exerciseStatistic) {
      this.exerciseStatistic.push(new ExerciseStatistic().deserialize(exerciseStatistic[i]));
    }
    return this;
  }
}
