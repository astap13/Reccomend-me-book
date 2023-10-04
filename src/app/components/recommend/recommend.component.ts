import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { BookService } from 'src/app/services/book-service/book-save.service';

import { fadeInAnimation } from '../../animations/fade-in.animation';
import { GoogleBooksVolume } from '../../models';
import { RecommendationService } from './recommend.service';

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.scss'],
  animations: [fadeInAnimation],
})
export class RecommendComponent implements OnInit {
  randomBook$!: Observable<GoogleBooksVolume>;

  loading$!: Observable<boolean>;

  constructor(
    private recommendationService: RecommendationService,
    private bookService: BookService,
  ) {}

  ngOnInit(): void {
    this.fetchRandomBook();
  }

  fetchRandomBook() {
    this.randomBook$ = this.recommendationService.getRandomBook();
    this.loading$ = this.recommendationService.getLoadingStatus();
  }

  getRandomBook() {
    this.fetchRandomBook();
  }

  saveBook(bookId: string) {
    console.log(bookId);
    this.bookService.saveBook(bookId).subscribe(
      (response) => {
        console.log('Book saved successfully');
        console.log(response);
        // Дополнительные действия после успешного сохранения книги
      },
      (error) => {
        console.error('Error saving book', error);
        // Обработка ошибки
      },
    );
  }
}
