import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private _http: HttpClient) {}

  saveBook(bookId: string) {
    return this._http.post('http://localhost:3000/save-book', { bookId }, { observe: 'response' });
  }

  getSavedBooks() {
    return this._http.get('http://localhost:3000/saved-books', {
      observe: 'response',
    });
  }

  private apiUrl = 'https://www.googleapis.com/books/v1/volumes';

  getBookById(bookId: string): Observable<any> {
    const url = `${this.apiUrl}/${bookId}`;
    return this._http.get(url).pipe(
      catchError((error) => {
        console.error('Error fetching book by ID:', error);
        return [];
      }),
    );
  }
}
