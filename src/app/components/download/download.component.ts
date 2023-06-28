import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from "../../services/token-storage/token-storage.service";
import { DocumentService } from "../../services/document/document.service";

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {
  isLoggeIn = false;

  constructor(
    private tokenStorage: TokenStorageService,
    private documentService: DocumentService
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken())
      this.isLoggeIn = true;
  }

  //TODO implementare il download, guardare series-detail, bisogna passare l'id del documento
}
