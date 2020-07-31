import {Serializable} from './serializable';
import {Serializator} from './serializator';
import {Exercise} from './exercise';

export class ExerciseList implements Serializable<ExerciseList> {
  private exercises: Exercise[] = [];

  constructor() {
  }

  public getExercises(): Exercise[] {
    return this.exercises;
  }

  deserialize(input: object): ExerciseList {
    const serializator = new Serializator(ExerciseList.name);
    const exercises = serializator.getObjectProperty(input, 'exercises');
    for (const i in exercises) {
      this.exercises.push(new Exercise().deserialize(exercises[i]));
    }
    return this;
  }

}
