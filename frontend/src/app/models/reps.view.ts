export class RepsView {
  private weight: string;
  private reps: string;

  constructor(weight: string, reps: string) {
    this.weight = weight;
    this.reps = reps;
  }

  public getWeight(): string {
    return this.weight;
  }

  public getReps(): string {
    return this.reps;
  }

  public setWeight(weight: string): void {
    this.weight = weight;
  }

  public setReps(reps: string): void {
    this.reps = reps;
  }
}
