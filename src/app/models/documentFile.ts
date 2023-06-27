export class DocumentFile {
  filename: string;
  size: number;
  file: File

  constructor(filename: string, size: number, file: File) {
    this.filename = filename;
    this.size = size;
    this.file = file;
  }
}
