import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { DocumentInfo } from "../../models/documentInfo";
import { TokenStorageService } from "../token-storage/token-storage.service";
import { User } from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documentUrl: string = 'http://localhost:4000/api/documents';
  private user: User

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {
    this.user = tokenStorageService.getUser()
  }

  addDocument(docInfo: DocumentInfo, docFile: File): Observable<any> {
    const data: FormData = new FormData();
    data.append("docInfo", new Blob([JSON.stringify(docInfo)], {type: "application/json"}));
    data.append("docFile", new Blob([docFile], {type: "multipart/form-data"}))
    return this.http.post(this.documentUrl, data, {
        headers: new HttpHeaders({'Authorization': this.user.tokenType + ' ' + this.user.token}),
        responseType: "text"
    }).pipe(
      catchError(this.handleError('updateDocument'))
    );
  }

  deleteDocument(id: number): Observable<any>{
    return this.http.delete(this.documentUrl + "?id=" + id, {
      headers: new HttpHeaders({'Authorization': this.user.tokenType + ' ' + this.user.token}),
    }).pipe(
      catchError(this.handleError('deleteDocument'))
    );
  }

  updateDocument(docInfo: DocumentInfo, docFile?: File): Observable<any> {
    const data: FormData = new FormData();
    data.append("docInfo", new Blob([JSON.stringify(docInfo)], {type: "application/json"}));
    if (docFile != null)
      data.append("docFile", new Blob([docFile], {type: "multipart/form-data"}))
    else
      data.append("docFile", new Blob([], {type: "multipart/form-data"}))
    return this.http.put(this.documentUrl + '?id=' + docInfo.id, data, {
      headers: new HttpHeaders({'Authorization': this.user.tokenType + ' ' + this.user.token}),
    }).pipe(
      catchError(this.handleError('updateDocument'))
    );
  }

  getDocument(id: number): Observable<any> {
    return this.http.get(this.documentUrl + '?id=' + id, {
      headers: new HttpHeaders({'Authorization': this.user.tokenType + ' ' + this.user.token}),
      responseType: "blob"
    }).pipe(
      catchError(this.handleError('getDocument'))
    );

  }

  getReport(year: number): Observable<any> {
    return this.http.get(this.documentUrl + "/report" + "?year=" + year, {
      headers: new HttpHeaders({'Authorization': this.user.tokenType + ' ' + this.user.token}),
    }).pipe(
      catchError(this.handleError('getReport', []))
    );
  }

  getAllDocuments(): Observable<DocumentInfo[]> {
    return this.http.get<DocumentInfo[]>(this.documentUrl + "/all", {
      headers: new HttpHeaders({'Authorization': this.user.tokenType + ' ' + this.user.token}),
    }).pipe(
      catchError(this.handleError<DocumentInfo[]>('getAllDocuments', []))
    );
  }

  getDocumentsByTag(tag: string): Observable<DocumentInfo[]> {
    return this.http.get<DocumentInfo[]>(this.documentUrl + "/by_tag?tag=" + tag, {
      headers: new HttpHeaders({'Authorization': this.user.tokenType + ' ' + this.user.token}),
    }).pipe(
      catchError(this.handleError<DocumentInfo[]>('getDocumentsByTag', []))
    );
  }

  getDocumentsByYear(year: number): Observable<DocumentInfo[]> {
    return this.http.get<DocumentInfo[]>(this.documentUrl + "/by_year?year=" + year, {
      headers: new HttpHeaders({'Authorization': this.user.tokenType + ' ' + this.user.token}),
    }).pipe(
      catchError(this.handleError<DocumentInfo[]>('getAllDocumentsByYear', []))
    );
  }

  getDocumentsByYearAndTag(year: number, tag: string): Observable<DocumentInfo[]> {
    return this.http.get<DocumentInfo[]>(this.documentUrl + "/by_year_and_tag?year=" + year + "&tag=" + tag, {
      headers: new HttpHeaders({'Authorization': this.user.tokenType + ' ' + this.user.token}),
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
    console.log(`DocumentService: ${message}`);
  }
}
