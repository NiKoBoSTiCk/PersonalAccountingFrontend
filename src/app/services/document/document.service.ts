import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MessageService } from "../message/message.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Document } from "../../models/document";


@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private documentUrl = 'http://172.22.160.101:4000/document/';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  addDocument(title:string, username:string): Observable<any>{
    return this.http.post(this.documentUrl,
      {
        title: title,
        username: username
      })
      .pipe(
        catchError(this.handleError('addDocument'))
      );
  }

  deleteDocument(title:string, username:string): Observable<any>{
    return this.http.delete(this.documentUrl, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        title: title,
        username: username
      },
    }).pipe(
      catchError(this.handleError('deleteDocument'))
    );
  }

  updateDocument(title:string, username:string, status:string, progress:number,  score:number, comment:string): Observable<any>{
    return this.http.put(this.documentUrl, {
      title: title,
      username: username,
      progress: progress,
      status: status,
      score: score,
      comment: comment
    }).pipe(
      catchError(this.handleError('updateDocument'))
    );
  }

  getDocument(username:string): Observable<Document[]> {
    return this.http.get<Document[]>(
      this.documentUrl + username)
      .pipe(
        catchError(this.handleError<Document[]>('getDocument', []))
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
