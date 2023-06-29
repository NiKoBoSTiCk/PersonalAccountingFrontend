import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from "../../services/token-storage/token-storage.service";
import { DocumentService } from "../../services/document/document.service";
import { DocumentInfo } from "../../models/documentInfo";
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  documents: DocumentInfo[] = []
  selectedDocument: any = null
  isLoggeIn: boolean = false;

  constructor(
    private tokenStorage: TokenStorageService,
    private documentService: DocumentService
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggeIn = true;
      this.getDocuments();
    }
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

  select(doc: any): void {
    this.selectedDocument = doc
  }

  downloadDocument(): void {
    if (this.selectedDocument) {
      this.documentService.getDocument(this.selectedDocument.id!!).subscribe({
        next: (data: Blob): void => { saveAs(data, `${this.selectedDocument.filename}`); }
      })
    }
  }

  deleteDocument(): void {
    if (this.selectedDocument) {
      this.documentService.deleteDocument(this.selectedDocument.id!!).subscribe({
        next: (): void => { window.location.reload() }
      })
    }
  }
}
