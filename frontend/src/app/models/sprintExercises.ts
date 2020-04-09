import {Exercise} from './exercise';
import {SprintDay} from './sprintDay';
import {Serializable} from './serializable';
import {Serializator} from './serializator';

export class SprintExercises implements Serializable<SprintExercises> {
  private sprintDay: SprintDay;
  private exercises: Exercise[] = [];

  constructor() {
  }

  public getSprintDay(): SprintDay {
    return this.sprintDay;
  }

  public getExercises(): Exercise[] {
    return this.exercises;
  }

  deserialize(input): SprintExercises {
    const serializator = new Serializator(SprintExercises.name);
    const sprintDay = serializator.getObjectProperty(input, 'sprintDay');
    this.sprintDay = new SprintDay().deserialize(sprintDay);
    const exercises = serializator.getObjectProperty(input, 'exercises');

    for (const i in exercises) {
      this.exercises.push(new Exercise().deserialize(exercises[i]));
    }
    return this;
  }
}
