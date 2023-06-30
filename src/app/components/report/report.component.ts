import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from "../../services/token-storage/token-storage.service";
import { DocumentService } from "../../services/document/document.service";
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  isLoggeIn: boolean = false;
  year: number = 2023
  MAX_YEAR: number = new Date().getFullYear()
  report: Map<string, number> = new Map<string, number>()
  columnsToDisplay: string[] = ['Tag', 'Total Amount'];

  constructor(
    private tokenStorage: TokenStorageService,
    private documentService: DocumentService
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggeIn = true;
      this.getReport()
    }
  }

  getReport(): void {
    if (this.year>=1950 && this.year<=this.MAX_YEAR) {
      this.report = new Map<string, number>()
      this.documentService.getReport(this.year).subscribe({
        next: (data): void => { this.report = data }
      })
    }
  }

}
