export class DocumentFile {
  filename: string;
  file: File

  constructor(filename: string, file: File) {
    this.filename = filename;
    this.file = file;
  }
}
