import { Component, OnInit } from '@angular/core';
import { DocumentService } from "../../services/document/document.service";
import { TokenStorageService } from "../../services/token-storage/token-storage.service";
import { DocumentInfo } from "../../models/documentInfo";
import { Router } from "@angular/router";

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
  showSpinner: boolean = false;
  isLoggedIn: boolean = false;
  isUploaded: boolean = false;
  MAX_YEAR: number = new Date().getFullYear()
  tagList: string[] = ['Alimentari', 'Scuola', 'Finanza', 'Trasporti', 'Utenze', 'Assicurazioni', 'Sport',
    'Salute', 'Ristoranti', 'Cultura', 'Casa', 'Abbigliamento', 'Altro']

  constructor(
    private documentService: DocumentService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  onFileSelected(event: any): void {
    this.showSpinner = true;
    const { filename, description, amount, tag, year } = this.form;
    let docFile: File = event.target.files[0];
    let docInfo: DocumentInfo = new DocumentInfo(filename, amount, year, tag, description)
    try {
      this.documentService.addDocument(docInfo, docFile).subscribe( {
        next: (): void => {
          this.showSpinner = false;
          this.isUploaded = true;
          void this.router.navigate(['/documents'])
        }
      })
    }
    catch (e) {
      this.showSpinner = false;
      this.isUploaded = false;
    }
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }
}
