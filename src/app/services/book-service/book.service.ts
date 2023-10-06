import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private _http: HttpClient) {}

  private apiUrl = 'https://www.googleapis.com/books/v1/volumes';

  saveBook(bookId: string) {
    return this._http.post(
      'https://recommend-me-book-api.onrender.com/save-book',
      { bookId },
      { observe: 'response' },
    );
  }

  getSavedBooks() {
    return this._http.get('https://recommend-me-book-api.onrender.com/saved-books', {
      observe: 'response',
    });
  }

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
