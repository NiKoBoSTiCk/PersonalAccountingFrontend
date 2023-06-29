export class Report {
  private report: Map<string, number>

  constructor(obj: any) {
    this.report = new Map<string, number>(Object.entries(obj))
  }
}
