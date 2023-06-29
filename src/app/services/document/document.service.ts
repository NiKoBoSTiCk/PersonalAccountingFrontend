import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { MessageService } from "../message/message.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { DocumentInfo } from "../../models/documentInfo";
import { DocumentFile } from "../../models/documentFile";
import {TokenStorageService} from "../token-storage/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documentUrl: string = 'http://172.28.175.170:4000/api/documents';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private tokenStorageService: TokenStorageService
  ) { }

  addDocument(docInfo: DocumentInfo, docFile: File): Observable<any> {
    const data: FormData = new FormData();
    data.append("docInfo", new Blob([JSON.stringify(docInfo)], {type: "application/json"}));
    data.append("docFile", new Blob([docFile], {type: "multipart/form-data"}))
    return this.http.post(this.documentUrl, data, {
        headers: new HttpHeaders({'Authorization': 'Bearer ' + this.tokenStorageService.getToken()})
    }).pipe(
      catchError(this.handleError('updateDocument'))
    );
  }

  deleteDocument(id: number): Observable<any>{
    return this.http.delete(this.documentUrl + "?id=" + id).pipe(
      catchError(this.handleError('deleteDocument'))
    );
  }

  updateDocument(docInfo: DocumentInfo, docFile?: File): Observable<any> {
    const data: FormData = new FormData();
    data.append("docInfo", new Blob([JSON.stringify(docInfo)], {type: "application/json"}));
    if (docFile != null)
      data.append("docFile", new Blob([docFile], {type: "multipart/form-data"}))
    return this.http.put(this.documentUrl, data, {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + this.tokenStorageService.getToken()})
    }).pipe(
      catchError(this.handleError('updateDocument'))
    );
  }

  getDocument(id: number): Observable<DocumentFile> {
    return this.http.get<DocumentFile>(this.documentUrl + "?id=" + id, {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + this.tokenStorageService.getToken()})
    }).pipe(
      catchError(this.handleError<DocumentFile>('getDocument'))
    );
  }

  getReport(year: number): Observable<any> {
    return this.http.get(this.documentUrl + "/report" + "?year=" + year, {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + this.tokenStorageService.getToken()})
    }).pipe(
      catchError(this.handleError('getReport', []))
    );
  }

  getAllDocuments(): Observable<DocumentInfo[]> {
    return this.http.get<DocumentInfo[]>(this.documentUrl + "/all", {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + this.tokenStorageService.getToken()})
    }).pipe(
      catchError(this.handleError<DocumentInfo[]>('getAllDocuments', []))
    );
  }

  getDocumentsByTag(tag: string): Observable<DocumentInfo[]> {
    return this.http.get<DocumentInfo[]>(this.documentUrl + "/by_tag?tag=" + tag, {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + this.tokenStorageService.getToken()})
    }).pipe(
      catchError(this.handleError<DocumentInfo[]>('getDocumentsByTag', []))
    );
  }

  getDocumentsByYear(year: number): Observable<DocumentInfo[]> {
    return this.http.get<DocumentInfo[]>(this.documentUrl + "/by_year?year=" + year, {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + this.tokenStorageService.getToken()})
    }).pipe(
      catchError(this.handleError<DocumentInfo[]>('getAllDocumentsByYear', []))
    );
  }

  getDocumentsByYearAndTag(year: number, tag: string): Observable<DocumentInfo[]> {
    return this.http.get<DocumentInfo[]>(this.documentUrl + "/by_year_and_tag?year=" + year + "?tag=" + tag, {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + this.tokenStorageService.getToken()})
    }).pipe(
      catchError(this.handleError<DocumentInfo[]>('getAllDocumentsByYearAndTag', []))
    );
  }

  private handleError<T>(operation: string = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string): void {
    this.messageService.add(`DocumentService: ${message}`);
  }
}
