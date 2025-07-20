import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ProductState } from '../models/product';

const selectProductsState = createFeatureSelector<ProductState>('products');

export const selectAllProducts = createSelector(
    selectProductsState,
    state => state.products
);

export const selectProductLoading = createSelector(
    selectProductsState,
    state => state.loading
);

export const selectProductError = createSelector(
    selectProductsState,
    state => state.error
);
