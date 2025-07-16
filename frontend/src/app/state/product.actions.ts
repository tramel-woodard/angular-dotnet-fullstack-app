import { Product } from '../models/product';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ProductActions = createActionGroup({
    source: 'Product',
    events: {
        // Load
        'Load': emptyProps(),
        'Load Success': props<{ products: Product[] }>(),
        'Load Failure': props<{ error: string }>(),

        // Add
        'Add': props<{ product: Product }>(),
        'Add Success': props<{ product: Product }>(),
        'Add Failure': props<{ error: string }>(),

        // Update
        'Update': props<{ product: Product }>(),
        'Update Success': props<{ product: Product }>(),
        'Update Failure': props<{ error: string }>(),

        // Delete
        'Delete': props<{ id: number }>(),
        'Delete Success': props<{ id: number }>(),
        'Delete Failure': props<{ error: string }>()
    }
});
