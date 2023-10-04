import { Component, OnInit } from '@angular/core';

import { BookService } from 'src/app/services/book-service/book-save.service';

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

  // Сохранение книги
  saveBook(bookId: string) {
    this.bookService.saveBook(bookId).subscribe(
      (response) => {
        console.log('Book saved successfully', response);
      },
      (error) => {
        console.error('Error saving book', error);
      },
    );
  }

  // Пример метода для получения списка сохраненных книг
  getSavedBooksID() {
    this.bookService.getSavedBooks().subscribe(
      (response) => {
        response.body as any[];
        this.savedBooksID = response.body as any[];
        console.log('Saved books:', this.savedBooksID);
        // Дополнительные действия после получения списка
      },
      (error) => {
        console.error('Error fetching saved books', error);
        // Обработка ошибки
      },
    );
  }
}
