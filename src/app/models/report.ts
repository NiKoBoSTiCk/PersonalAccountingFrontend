export class Report {
  private report;

  constructor(obj: any) {
    this.report = new Map<string, number>(Object.entries(obj))
  }
}
