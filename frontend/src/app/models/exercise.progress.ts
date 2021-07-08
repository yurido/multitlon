import {Serializable} from './serializable';
import {Serializator} from './serializator';

export class ExerciseProgress implements Serializable<ExerciseProgress> {
  private sid: string;
  private progress: number;
  private totalRaw: number;
  private totalPoints: number;
  private averagePoints: number;
  private maxPoints: number;
  private quota: number;

  constructor() {}

  public getSid(): string {
    return this.sid;
  }

  public getProgress(): number {
    return this.progress;
  }

  public getTotalRaw(): number {
    return this.totalRaw;
  }

  public getTotalPoints(): number {
    return this.totalPoints;
  }

  getAveragePoints(): number {
    return this.averagePoints;
  }

  getMaxPoints(): number {
    return this.maxPoints;
  }

  getQuota(): number {
    return this.quota;
  }

  deserialize(input: object): ExerciseProgress {
    const serializator = new Serializator(ExerciseProgress.name);
    this.sid = serializator.getObjectProperty(input, 'sid');
    this.progress = serializator.getObjectProperty(input, 'progress');
    this.totalRaw = serializator.getObjectProperty(input, 'totalRaw');
    this.totalPoints = serializator.getObjectProperty(input, 'totalPoints');
    this.averagePoints = serializator.getObjectProperty(input, 'averagePoints');
    this.maxPoints = serializator.getObjectProperty(input, 'maxPoints');
    this.quota = serializator.getObjectProperty(input, 'quota');
    return this;
  }
}
