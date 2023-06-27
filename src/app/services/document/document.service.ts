import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MessageService } from "../message/message.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { DocumentInfo } from "../../models/documentInfo";
import { DocumentFile } from "../../models/documentFile";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private documentUrl = 'http://172.28.175.170:4000/api/documents';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  addDocument(docInfo: DocumentInfo, docFile: DocumentFile): Observable<any> {
    const data: FormData = new FormData();
    data.append("docFile", docFile.file, docFile.filename)
    data.append("docInfo", JSON.stringify(docInfo))
    return this.http.post(this.documentUrl, data, {
        reportProgress: true,
        observe: 'events'
    }).pipe(
      catchError(this.handleError('updateDocument'))
    );
  }

  deleteDocument(id: number): Observable<any>{
    return this.http.delete(this.documentUrl + "?id=" + id).pipe(
      catchError(this.handleError('deleteDocument'))
    );
  }

  updateDocument(docInfo: DocumentInfo, docFile?: DocumentFile): Observable<any> {
    const data: FormData = new FormData();
    data.append("docInfo", JSON.stringify(docInfo))
    if (docFile != null)
      data.append("docFile", docFile.file, docFile.filename)
    return this.http.put(this.documentUrl, data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError('updateDocument'))
    );
  }

  getDocument(id: number): Observable<DocumentFile> {
    return this.http.get<DocumentFile>(this.documentUrl + "?id=" + id).pipe(
      catchError(this.handleError<DocumentFile>('getDocument'))
    );
  }

  getReport(year: number): Observable<any> {
    return this.http.get(this.documentUrl + "/report" + "?year=" + year).pipe(
      catchError(this.handleError('getReport', []))
    );
  }

  getAllDocuments(): Observable<DocumentInfo[]> {
    return this.http.get<DocumentInfo[]>(this.documentUrl + "/all").pipe(
      catchError(this.handleError<DocumentInfo[]>('getAllDocuments', []))
    );
  }

  getDocumentsByTag(tag: string): Observable<DocumentInfo[]> {
    return this.http.get<DocumentInfo[]>(this.documentUrl + "/by_tag?tag=" + tag).pipe(
      catchError(this.handleError<DocumentInfo[]>('getDocumentsByTag', []))
    );
  }

  getDocumentsByYear(year: number): Observable<DocumentInfo[]> {
    return this.http.get<DocumentInfo[]>(this.documentUrl + "/by_year?year=" + year).pipe(
      catchError(this.handleError<DocumentInfo[]>('getAllDocumentsByYear', []))
    );
  }

  getDocumentsByYearAndTag(year: number, tag: string): Observable<DocumentInfo[]> {
    return this.http.get<DocumentInfo[]>(this.documentUrl + "/by_year_and_tag?year=" + year + "?tag=" + tag).pipe(
      catchError(this.handleError<DocumentInfo[]>('getAllDocumentsByYearAndTag', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`DocumentService: ${message}`);
  }
}
