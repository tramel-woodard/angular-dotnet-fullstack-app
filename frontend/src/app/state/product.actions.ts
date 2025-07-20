import { Product } from '../models/product';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { AppError } from '../utils/error.util';

export const ProductActions = createActionGroup({
    source: 'Product',
    events: {
        // Load
        'Load': emptyProps(),
        'Load Success': props<{ products: Product[] }>(),
        'Load Failure': props<{ error: AppError }>(),

        // Add
        'Add': props<{ product: Product }>(),
        'Add Success': props<{ product: Product }>(),
        'Add Failure': props<{ error: AppError }>(),

        // Update
        'Update': props<{ product: Product }>(),
        'Update Success': props<{ product: Product }>(),
        'Update Failure': props<{ error: AppError }>(),

        // Delete
        'Delete': props<{ id: number }>(),
        'Delete Success': props<{ id: number }>(),
        'Delete Failure': props<{ error: AppError }>()
    }
});
