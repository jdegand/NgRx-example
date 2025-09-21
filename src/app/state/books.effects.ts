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
    private readonly actions$: Actions,
    private readonly GoogleBooksService: GoogleBooksService
  ) {}
}
