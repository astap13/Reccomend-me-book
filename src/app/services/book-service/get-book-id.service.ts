import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) {}

  getBookById(bookId: string): Observable<any> {
    const url = `${this.apiUrl}/${bookId}`;

    return this.http.get(url).pipe(
      catchError((error) => {
        console.error('Error fetching book by ID:', error);
        return [];
      }),
    );
  }
}
