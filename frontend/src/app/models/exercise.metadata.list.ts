import {Serializable} from './serializable';
import {ExerciseMetadata} from './exercise.metadata';
import {Serializator} from './serializator';

export class ExerciseMetadataList implements Serializable<ExerciseMetadataList> {
  private exerciseMetadata: ExerciseMetadata[] = [];

  constructor() {
  }

  public getExerciseMetadata(): ExerciseMetadata[] {
    return this.exerciseMetadata;
  }

  public deserialize(input: object): ExerciseMetadataList {
    const serializator = new Serializator(ExerciseMetadataList.name);
    const exerciseMetadata = serializator.getObjectProperty(input, 'exerciseMetadata');
    for (const i in exerciseMetadata) {
      this.exerciseMetadata.push(new ExerciseMetadata().deserialize(exerciseMetadata[i]));
    }
    return this;
  }

}
