export class ExerciseSidName {
  private sid: string;
  private name: string;

  constructor(sid: string, name: string) {
    this.name = name;
    this.sid = sid;
  }

  public getSid(): string {
    return this.sid;
  }

  public getName(): string {
    return this.name;
  }
}
