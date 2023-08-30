import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, switchMap } from 'rxjs/operators';

import { GoogleBooksVolume } from '../models';

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.scss'],
})
export class RecommendComponent implements OnInit {
  randomBook$!: Observable<GoogleBooksVolume>;

  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getRandomBook();
  }

  getRandomBook() {
    const apiKey = 'AIzaSyATGetjHIGDTBIQG8_HL5b4rxERXjgFdJM';
    const maxResults = 1;
    const randomIndex = Math.floor(Math.random() * 100);
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=subject:&startIndex=${randomIndex}&maxResults=${maxResults}&key=${apiKey}`;
    this.loading$.next(true);
    this.randomBook$ = this.http.get(apiUrl).pipe(
      switchMap((response: any) => {
        if (response.items && response.items.length > 0) {
          const randomBook = response.items[0];
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
  }
}
