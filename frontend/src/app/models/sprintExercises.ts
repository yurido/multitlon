import {Exercise} from './exercise';
import {SprintDate} from './sprintDate';
import {Serializable} from './serializable';
import {Serializator} from './serializator';

export class SprintExercises extends Serializator implements Serializable<SprintExercises> {
  private sprintDate: SprintDate;
  private exercises: Exercise[] = [];

  constructor() {
    super(SprintExercises.name);
  }

  public getSprintDate(): SprintDate {
    return this.sprintDate;
  }

  public getExercises(): Exercise[] {
    return this.exercises;
  }

  deserialize(input): SprintExercises {
    const sprintDate = super.getObjectProperty(input, 'sprintDate');
    this.sprintDate = new SprintDate().deserialize(sprintDate);
    const exercises = super.getObjectProperty(input, 'exercises');

    for (const i in exercises) {
      this.exercises.push(new Exercise().deserialize(exercises[i]));
    }
    return this;
  }
}
