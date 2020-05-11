import {Serializable} from './serializable';
import {ExerciseMetadata} from './exercise.metadata';

export class ExerciseMetadataList implements Serializable<ExerciseMetadataList> {
  private exerciseMetadata: ExerciseMetadata[];

  constructor() {}

  public
  deserialize(input: object): ExerciseMetadataList {
    return this;
  }

}
