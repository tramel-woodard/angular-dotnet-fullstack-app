export interface Product {
    id: number;
    name: string;
    price: number;
}

export interface ProductState {
    items: Product[];
    loading: boolean;
    error: string | null;
}

export const initialProductState: ProductState = {
    items: [],
    loading: false,
    error: null
};
