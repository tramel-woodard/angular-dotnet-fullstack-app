import { AppError } from "../utils/error.util";

export interface Product {
    id: number;
    name: string;
    price: number;
}

export interface ProductState {
    products: Product[];
    loading: boolean;
    error: AppError | null;
}

export const initialProductState: ProductState = {
    products: [],
    loading: false,
    error: null
};
