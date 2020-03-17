export class SprintDate {
  private date: number;
  private isWeekend: boolean;

  constructor(date: number, isWeekend: boolean) {
    this.date = date;
    this.isWeekend = isWeekend;
  }

  public getSprintDate(): number {
    return this.date;
  }

  public getIsWeekend(): boolean {
    return this.isWeekend;
  }
}
