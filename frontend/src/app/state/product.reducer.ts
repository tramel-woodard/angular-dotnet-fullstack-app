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
        items: products,
        loading: false
    })),
    on(ProductActions.loadFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(ProductActions.addSuccess, (state, { product }) => ({
        ...state,
        items: [...state.items, product]
    })),
    on(ProductActions.addFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(ProductActions.updateSuccess, (state, { product }) => ({
        ...state,
        items: state.items.map(p => 
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
        items: state.items.filter(p => p.id !== id)
    })),
    on(ProductActions.deleteFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
);
