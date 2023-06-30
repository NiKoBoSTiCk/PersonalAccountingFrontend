import { Component, Inject, OnInit } from '@angular/core';
import { TokenStorageService } from "../../services/token-storage/token-storage.service";
import { DocumentService } from "../../services/document/document.service";
import { DocumentInfo } from "../../models/documentInfo";
import { saveAs } from 'file-saver';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";

export interface DialogGetData {
  tagList: string[];
  tag: string;
  year: number;
}

export interface DialogUpdateData {
  id: number
  filename: string;
  tagList: string[];
  tag: string;
  year: number;
  amount: number;
  description: string;
}

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  documents: DocumentInfo[] = []
  isLoggeIn: boolean = false;
  columnsToDisplay: string[] = ['Filename', 'Tag', 'Year', 'Amount', 'Description', 'Update' , 'Download', 'Delete'];
  tagList: string[] = ['Alimentari', 'Scuola', 'Finanza', 'Trasporti', 'Utenze', 'Assicurazioni', 'Sport',
    'Salute', 'Ristoranti', 'Cultura', 'Casa', 'Abbigliamento', 'Altro']

  constructor(
    private tokenStorage: TokenStorageService,
    private documentService: DocumentService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggeIn = true;
    }
    this.getDocuments()
  }

  getDocuments(): void {
    this.documentService.getAllDocuments().subscribe({
      next: (data: DocumentInfo[]): void => { this.documents = data }
    })
  }

  getDocumentsByTag(tag: string): void {
    this.documentService.getDocumentsByTag(tag).subscribe({
      next: (data: DocumentInfo[]): void => { this.documents = data }
    })
  }

  getDocumentsByYear(year: number): void {
    this.documentService.getDocumentsByYear(year).subscribe({
      next: (data: DocumentInfo[]): void => { this.documents = data }
    })
  }

  getDocumentsByYearAndTag(year: number, tag: string): void {
    this.documentService.getDocumentsByYearAndTag(year, tag).subscribe({
      next: (data: DocumentInfo[]): void => { this.documents = data }
    })
  }

  downloadDocument(doc: DocumentInfo): void {
    this.documentService.getDocument(doc.id!!).subscribe({
      next: (data: Blob): void => { saveAs(data, `${doc.filename}`); }
    })
  }

  deleteDocument(doc: DocumentInfo): void {
    this.documentService.deleteDocument(doc.id!!).subscribe({
      next: (): void => { window.location.reload() }
    })
  }

  openDialogGet(): void {
    const dialogRef = this.dialog.open(DialogGet, {
      data: { tagList: this.tagList }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data.year && data.tag)
        this.getDocumentsByYearAndTag(data.year, data.tag)
      else if (data.tag)
        this.getDocumentsByTag(data.tag)
      else if (data.year)
        this.getDocumentsByYear(data.year)
      else return;
    });
  }

  openDialogUpdate(doc: DocumentInfo): void {
    const dialogRef = this.dialog.open(DialogUpdate, {
      data: { filename: doc.filename, tag: doc.tag, year: doc.year, amount: doc.amount, description: doc.description, tagList: this.tagList, id: doc.id }
    });

    dialogRef.afterClosed().subscribe(data => {
      let newDoc: DocumentInfo = new DocumentInfo(data.filename, data.amount, data.year, data.tag, data.description, data.id)
      this.documentService.updateDocument(newDoc).subscribe({
        next: (): void => { this.getDocuments() }
      })
    });
  }
}

@Component({
  selector: 'dialog-get',
  templateUrl: 'dialog-get.html',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatSelectModule, NgForOf, NgIf],
})
export class DialogGet {
  constructor(
    public dialogRef: MatDialogRef<DialogGet>,
    @Inject(MAT_DIALOG_DATA) public data: DialogGetData,
  ) {}
  MAX_YEAR: number = new Date().getFullYear()
  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-update',
  templateUrl: 'dialog-update.html',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatSelectModule, NgForOf, NgIf],
})
export class DialogUpdate {
  constructor(
    public dialogRef: MatDialogRef<DialogUpdate>,
    @Inject(MAT_DIALOG_DATA) public data: DialogUpdateData,
  ) {}
  MAX_YEAR: number = new Date().getFullYear()
  onNoClick(): void {
    this.dialogRef.close();
  }
}
