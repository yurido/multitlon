import {Serializable} from './serializable';
import {Serializator} from './serializator';
import {Reps} from './reps';

export class Exercise implements Serializable<Exercise> {
  private id: string;
  private sid: string;
  private date: number;
  private reps: Reps[] = [];
  private rawPoints: number;
  private totalPoints: number;
  private time: number;
  private progress: number;
  private quota: number;

  constructor() {
  }

  public getId(): string {
    return this.id;
  }

  public getSid(): string {
    return this.sid;
  }

  public getDate(): number {
    return this.date;
  }

  public getReps(): Reps[] {
    return this.reps;
  }

  public getRawPoints(): number {
    return this.rawPoints;
  }

  public getTotalPoints(): number {
    return this.totalPoints;
  }

  public getTime(): number {
    return this.time;
  }

  public getProgress(): number {
    return this.progress;
  }

  public getQuota(): number {
    return this.quota;
  }

  public setReps(reps: Reps[]): void {
    this.reps = reps;
  }

  public setRawPoints(rawPoints: number): void {
    this.rawPoints = rawPoints;
  }

  public setTotalPoints(totalPoints: number): void {
    this.totalPoints = totalPoints;
  }

  public setProgress(progress: number): void {
    this.progress = progress;
  }

  public setQuota(quota: number): void {
    this.quota = quota;
  }

  deserialize(input): Exercise {
    const serializator = new Serializator(Exercise.name);
    this.id = serializator.getObjectProperty(input, 'id');
    this.sid = serializator.getObjectProperty(input, 'sid');
    this.date = serializator.getObjectProperty(input, 'date');
    const reps = serializator.getObjectProperty(input, 'reps');
    for (const i in reps) {
      this.reps.push(new Reps().deserialize(reps[i]));
    }
    this.rawPoints = serializator.getObjectProperty(input, 'rawPoints');
    this.totalPoints = serializator.getObjectProperty(input, 'totalPoints');
    this.time = serializator.getObjectProperty(input, 'time');
    this.progress = serializator.getObjectProperty(input, 'progress');
    this.quota = serializator.getObjectProperty(input, 'quota');
    return this;
  }
}
