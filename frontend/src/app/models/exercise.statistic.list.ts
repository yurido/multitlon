import {Serializable} from './serializable';
import {ExerciseStatistic} from './exercise.statistic';
import {Serializator} from './serializator';

export class ExerciseStatisticList implements Serializable<ExerciseStatisticList> {
  private exerciseStatistic: ExerciseStatistic[] = [];

  constructor() {
  }

  public getExerciseStatistic(): ExerciseStatistic[] {
    return this.exerciseStatistic;
  }

  deserialize(input: object): ExerciseStatisticList {
    const serializator = new Serializator(ExerciseStatisticList.name);
    const exerciseStatistic = serializator.getObjectProperty(input, 'exerciseStatistic');

    for (const i in exerciseStatistic) {
      this.exerciseStatistic.push(new ExerciseStatistic().deserialize(exerciseStatistic[i]));
    }
    return this;
  }
}
