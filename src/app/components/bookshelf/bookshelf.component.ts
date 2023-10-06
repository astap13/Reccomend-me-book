import { Component, OnInit } from '@angular/core';

import { forkJoin } from 'rxjs';
import { BookService } from 'src/app/services/book-service/book.service';

@Component({
  selector: 'app-bookshelf',
  templateUrl: './bookshelf.component.html',
  styleUrls: ['./bookshelf.component.scss'],
})
export class BookshelfComponent implements OnInit {
  savedBooksID: any[] = []; // Инициализируем пустой массив для списка сохраненных книг

  savedBooks: any[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getSavedBooksID();
  }

  // Пример метода для получения списка сохраненных книг
  getSavedBooksID() {
    this.bookService.getSavedBooks().subscribe(
      (response: any) => {
        if (response) {
          this.savedBooksID = response.body.savedBooks;
          const bookObservables = this.savedBooksID.map((bookId) =>
            this.bookService.getBookById(bookId),
          );

          forkJoin(bookObservables).subscribe(
            (books: any[]) => {
              this.savedBooks = books;
            },
            (error) => {
              console.error('Error fetching saved books', error);
            },
          );
        } else {
          console.log('No saved books found in the response.');
        }
      },
      (error) => {
        console.error('Error fetching saved books', error);
      },
    );
  }
}
