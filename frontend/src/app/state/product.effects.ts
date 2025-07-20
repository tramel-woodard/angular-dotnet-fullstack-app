import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, mergeMap, of, tap } from 'rxjs';

import { ProductService } from '../services/product.service';
import { ProductActions } from './product.actions';
import { ToastService } from '../services/toast.service';

@Injectable()
export class ProductEffects {
    private actions$ = inject(Actions);
    private api = inject(ProductService);
    private toast = inject(ToastService);

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

    // Success Toasts
    toastAddSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ProductActions.addSuccess),
                tap(() => this.toast.success('Product added successfully'))
            ),
        { dispatch: false }
    );

    toastUpdateSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ProductActions.updateSuccess),
                tap(() => this.toast.success('Product updated successfully'))
            ),
        { dispatch: false }
    );

    toastDeleteSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ProductActions.deleteSuccess),
                tap(() => this.toast.success('Product deleted successfully'))
            ),
        { dispatch: false }
    );

    // Failure Toast
    toastFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(
                    ProductActions.addFailure,
                    ProductActions.updateFailure,
                    ProductActions.deleteFailure
                ),
                tap(({ error }) => this.toast.error(error))
            ),
        { dispatch: false }
    );
}
