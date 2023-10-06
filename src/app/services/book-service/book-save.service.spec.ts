import { TestBed } from '@angular/core/testing';

import { BookSaveService } from './book.service';

describe('BookSaveService', () => {
  let service: BookSaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookSaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
