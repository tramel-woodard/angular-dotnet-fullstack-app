import { createReducer, on } from '@ngrx/store';
import { ProductActions } from './product.actions';
import { initialProductState } from '../models/product';

export const productsReducer = createReducer(
    initialProductState,

    on(ProductActions.load, state => ({
        ...state,
        loading: true,
        error: null
    })),
    on(ProductActions.loadSuccess, (state, { products }) => ({
        ...state,
        products,
        loading: false
    })),
    on(ProductActions.loadFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(ProductActions.addSuccess, (state, { product }) => ({
        ...state,
        products: [...state.products, product]
    })),
    on(ProductActions.addFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(ProductActions.updateSuccess, (state, { product }) => ({
        ...state,
        products: state.products.map(p => 
            (p.id === product.id ? product : p)
        )
    })),
    on(ProductActions.updateFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(ProductActions.deleteSuccess, (state, { id }) => ({
        ...state,
        products: state.products.filter(p => p.id !== id)
    })),
    on(ProductActions.deleteFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
);
