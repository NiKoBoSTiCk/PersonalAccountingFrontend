export class DocumentInfo {
  id?: number
  description: string;
  amount: number;
  filename: string
  tag: string;
  year: number;

  constructor(filename: string, amount: number, year: number, tag: string, description: string, id?: number) {
    this.amount = amount;
    this.description = description;
    this.year = year;
    this.tag = tag;
    this.filename = filename;
    this.id = id;
  }
}
