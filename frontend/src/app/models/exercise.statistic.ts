import {Serializable} from './serializable';
import {Serializator} from './serializator';

export class ExerciseStatistic implements Serializable<ExerciseStatistic> {
  private sid: string;
  private progress: number;
  private totalRaw: number;
  private totalPoints: number;
  private averagePoints: number;
  private maxPonts: number;
  private quota: number;

  constructor() {
  }

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

  getMaxPonts(): number {
    return this.maxPonts;
  }

  getQuota(): number {
    return this.quota;
  }

  deserialize(input: object): ExerciseStatistic {
    const serializator = new Serializator(ExerciseStatistic.name);
    this.sid = serializator.getObjectProperty(input, 'sid');
    this.progress = serializator.getObjectProperty(input, 'progress');
    this.totalRaw = serializator.getObjectProperty(input, 'totalRaw');
    this.totalPoints = serializator.getObjectProperty(input, 'totalPoints');
    this.averagePoints = serializator.getObjectProperty(input, 'averagePoints');
    this.maxPonts = serializator.getObjectProperty(input, 'maxPonts');
    this.quota = serializator.getObjectProperty(input, 'quota');
    return this;
  }
}
