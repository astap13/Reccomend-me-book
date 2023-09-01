import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, switchMap } from 'rxjs/operators';

import { GoogleBooksVolume } from '../models';

@Injectable({
  providedIn: 'root',
})
export class RecommendationService {
  private apiKey = 'AIzaSyATGetjHIGDTBIQG8_HL5b4rxERXjgFdJM';

  private maxResults = 1;

  private loading$ = new BehaviorSubject<boolean>(true);

  private randomBook$: Observable<GoogleBooksVolume> | undefined;

  constructor(private http: HttpClient) {}

  getRandomBook(): Observable<GoogleBooksVolume> {
    const randomIndex = Math.floor(Math.random() * 100);
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=subject:&startIndex=${randomIndex}&maxResults=${this.maxResults}&key=${this.apiKey}`;

    this.loading$.next(true);

    this.randomBook$ = this.http.get(apiUrl).pipe(
      switchMap((response: any) => {
        if (response.items && response.items.length > 0) {
          const randomBook = response.items[0];
          if (!randomBook.volumeInfo.description) {
            return this.getRandomBook();
          }
          this.loading$.next(false);
          return of(randomBook);
        } else {
          this.loading$.next(false);
          return of(null);
        }
      }),
      catchError((error) => {
        console.error('Error fetching random book:', error);
        this.loading$.next(false);
        return of(null);
      }),
      finalize(() => this.loading$.next(false)),
    );

    return this.randomBook$;
  }

  getLoadingStatus(): Observable<boolean> {
    return this.loading$.asObservable();
  }
}
