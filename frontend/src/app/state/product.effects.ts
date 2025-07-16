import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, mergeMap, of } from 'rxjs';

import { ProductService } from '../services/product.service';
import { ProductActions } from './product.actions';

@Injectable()
export class ProductEffects {
    private actions$ = inject(Actions);
    private api = inject(ProductService);

    load$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.load),
            mergeMap(() =>
                this.api.getAll().pipe(
                    map(products => ProductActions.loadSuccess({ products })),
                    catchError(err => of(ProductActions.loadFailure({ error: err.message })))
                )
            )
        )
    );

    add$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.add),
            mergeMap(({ product }) =>
                this.api.create(product).pipe(
                    map(p => ProductActions.addSuccess({ product: p })),
                    catchError(err => of(ProductActions.addFailure({ error: err.message })))
                )
            )
        )
    );

    update$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.update),
            mergeMap(({ product }) =>
                this.api.update(product).pipe(
                    map(() => ProductActions.updateSuccess({ product })),
                    catchError(err => of(ProductActions.updateFailure({ error: err.message })))
                )
            )
        )
    );

    delete$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.delete),
            mergeMap(({ id }) =>
                this.api.delete(id).pipe(
                    map(() => ProductActions.deleteSuccess({ id })),
                    catchError(err => of(ProductActions.deleteFailure({ error: err.message })))
                )
            )
        )
    );
}