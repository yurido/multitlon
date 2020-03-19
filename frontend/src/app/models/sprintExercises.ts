import {Exercise} from './exercise';
import {SprintDate} from './sprintDate';
import {Serializable} from './serializable';
import {Serializator} from './serializator';

export class SprintExercises implements Serializable<SprintExercises> {
  private sprintDate: SprintDate;
  private exercises: Exercise[] = [];

  constructor() {
  }

  public getSprintDate(): SprintDate {
    return this.sprintDate;
  }

  public getExercises(): Exercise[] {
    return this.exercises;
  }

  deserialize(input): SprintExercises {
    const serializator = new Serializator(SprintExercises.name);
    const sprintDate = serializator.getObjectProperty(input, 'sprintDate');
    this.sprintDate = new SprintDate().deserialize(sprintDate);
    const exercises = serializator.getObjectProperty(input, 'exercises');

    for (const i in exercises) {
      this.exercises.push(new Exercise().deserialize(exercises[i]));
    }
    return this;
  }
}
