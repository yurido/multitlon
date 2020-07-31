export class SprintDay {
  private date: number;
  private isDayOff: boolean;
  private total: number;

  constructor(date: number, isDayOff: boolean, total: number) {
    this.date = date;
    this.isDayOff = isDayOff;
    this.total = total;
  }

  public getSDate(): number {
    return this.date;
  }

  public getIsDayOff(): boolean {
    return this.isDayOff;
  }

  public getTotal(): number {
    return this.total;
  }

  public setTotal(total: number): void {
    this.total = total;
  }

  public setSDate(date: number): void {
    this.date = date;
  }
}
