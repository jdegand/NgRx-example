import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectBookCollection, selectBooks } from './state/books.selectors';
import { BooksActions } from './state/books.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  books$ = this.store.select(selectBooks);
  bookCollection$ = this.store.select(selectBookCollection);

  onAdd(bookId: string) {
    this.store.dispatch(BooksActions.addBook({ bookId }));
  }

  onRemove(bookId: string) {
    this.store.dispatch(BooksActions.removeBook({ bookId }));
  }

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch({ type: '[Books Page] Load Books' });
  }
}
