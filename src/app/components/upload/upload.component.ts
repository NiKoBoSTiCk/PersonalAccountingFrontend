import { Component, OnInit } from '@angular/core';
import { DocumentService } from "../../services/document/document.service";
import { TokenStorageService } from "../../services/token-storage/token-storage.service";
import { DocumentInfo } from "../../models/documentInfo";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  form: any = {
    filename: null,
    description: null,
    amount: null,
    tag: null,
    year: null,
  };
  showSpinner = false;
  isLoggedIn = false;
  isUploaded = false;

  constructor(
    private documentService: DocumentService,
    private tokenStorage: TokenStorageService
  ) {}

  onFileSelected(event: any) {
    this.showSpinner = true;
    const { filename, description, amount, tag, year } = this.form;
    //TODO controllare i campi del form
    let docFile: File = event.target.files[0];
    let docInfo: DocumentInfo = new DocumentInfo(filename, amount, year, tag, description)
    this.documentService.addDocument(docInfo, docFile).subscribe(
      next => { this.showSpinner = false; this.isUploaded = true;},
      error => { this.isUploaded = false }
    )
    //TODO cambiare tipo di subscribe e mostrare eventuali errori
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }
}
