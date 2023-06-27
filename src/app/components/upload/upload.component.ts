import { Component, OnInit } from '@angular/core';
import { DocumentService } from "../../services/document/document.service";
import { TokenStorageService } from "../../services/token-storage/token-storage.service";
import { DocumentInfo } from "../../models/documentInfo";
import { DocumentFile } from "../../models/documentFile";
import { Subscription } from "rxjs";
import { HttpEventType } from "@angular/common/http";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  form: any = {
    description: null,
    amount: null,
    tag: null,
    year: null,
  };
  fileName = '';
  uploadProgress?: number;
  uploadSub?: Subscription;
  showSpinner = false;
  isLoggedIn = false;

  constructor(
    private documentService: DocumentService,
    private tokenStorage: TokenStorageService
  ) {}

  onFileSelected(event: any) {
    this.showSpinner = true;
    const file: File = event.target.files[0];
    let docFile = new DocumentFile(this.fileName, file)
    const { description, amount, tag, year } = this.form;
    let docInfo = new DocumentInfo(this.fileName, amount, year, tag, description)
    this.documentService.addDocument(docInfo, docFile).subscribe(
      event => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total));
        }
      }
    )
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  cancelUpload() {
    if (this.uploadSub != null)
      this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    // @ts-ignore
    this.uploadProgress = null;
    // @ts-ignore
    this.uploadSub = null;
  }
}
