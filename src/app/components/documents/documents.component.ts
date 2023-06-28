import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from "../../services/token-storage/token-storage.service";
import { DocumentService } from "../../services/document/document.service";

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  isLoggeIn = false;

  constructor(
    private tokenStorage: TokenStorageService,
    private documentService: DocumentService
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken())
      this.isLoggeIn = true;
    //TODO mostrare tutti i documenti, permetterne la ricerca per anno e tag
  }

}
