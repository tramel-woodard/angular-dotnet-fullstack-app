import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from '../models/product';

const selectProductsFeature = createFeatureSelector<ProductState>('products');

export const selectProducts = createSelector(
    selectProductsFeature,
    state => state.items
);

export const selectLoading = createSelector(
    selectProductsFeature,
    state => state.loading
);

export const selectError = createSelector(
    selectProductsFeature,
    state => state.error
);
