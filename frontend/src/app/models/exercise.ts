export class Exercise {
  private id: string;
  private name: string;
  private date: Date;
  private reps: number;
  private weight: number;
  private rawPoints: number;
  private totalPoints: number;

  constructor(id: string, name: string, date: Date, reps: number, weight: number, rawPoints: number, totalPoints: number) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.reps = reps;
    this.weight = weight;
    this.rawPoints = rawPoints;
    this.totalPoints = totalPoints;
  }

  get getId(): string {
    return this.id;
  }

  get getName(): string {
    return this.name;
  }

  get getDate(): Date {
    return this.date;
  }

  get getReps(): number {
    return this.reps;
  }

  get getWeight(): number {
    return this.weight;
  }

  get getRawPoints(): number {
    return this.rawPoints;
  }

  get getTotalPoints(): number {
    return this.totalPoints;
  }
}
