import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { GoogleBooksService } from '../book-list/books.service';
import { BooksApiActions } from './books.actions';

@Injectable()
export class BooksEffects {
 
  loadBooks$ = createEffect(() => this.actions$.pipe(
    ofType('[Books Page] Load Books'),
    exhaustMap(() => this.GoogleBooksService.getBooks()
      .pipe(
        map(books => BooksApiActions.booksLoadedSuccess({books})),
        catchError(() => EMPTY)
      ))
    )
  );
 
  constructor(
    private actions$: Actions,
    private GoogleBooksService: GoogleBooksService
  ) {}
}

// this.store.dispatch(BooksApiActions.retrievedBookList({ books })

/*
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { GoogleBooksService } from '../book-list/books.service';

@Injectable()
export class BooksEffects {
 
  loadBooks$ = createEffect(() => this.actions$.pipe(
    ofType('[Books Page] Load Books'),
    exhaustMap(() => this.GoogleBooksService.getBooks()
      .pipe(
        map(books => ({ type: '[Books API] Books Loaded Success', payload: books })),
        catchError(() => EMPTY)
      ))
    )
  );
 
  constructor(
    private actions$: Actions,
    private GoogleBooksService: GoogleBooksService
  ) {}
}
*/