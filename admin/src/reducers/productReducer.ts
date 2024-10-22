import { ADD_PRODUCT_FAIL, ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, MANAGE_PRODUCT_FAIL, MANAGE_PRODUCT_REQUEST, MANAGE_PRODUCT_SUCCESS } from "../constants/productConstants";

interface Product {
    id: string;
    name: string;
    // Add other properties as needed
}

interface ProductState {
    loading: boolean;
    products: Product[];
    error?: string;
}

interface Action {
    type: string;
    payload?: any;
}

const initialProductState: ProductState = {
    loading: false,
    products: []
};

export const productReducer = (state: ProductState = initialProductState, action: Action): ProductState => {
    switch (action.type) {
        case ADD_PRODUCT_REQUEST:
        case MANAGE_PRODUCT_REQUEST:
            return { loading: true, products: [] };
        case ADD_PRODUCT_SUCCESS:
        case MANAGE_PRODUCT_SUCCESS:
            return { loading: false, products: action.payload };
        case ADD_PRODUCT_FAIL:
        case MANAGE_PRODUCT_FAIL:
            return { loading: false, error: action.payload, products: [] };
        default:
            return state;
    }
};
