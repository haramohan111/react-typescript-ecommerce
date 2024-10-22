import { LIST_BRAND_FAIL, LIST_BRAND_REQUEST, LIST_BRAND_SUCCESS } from "../constants/brandConstants";

interface Brand {
    id: string;
    name: string;
    // Add other properties as needed
}

interface BrandState {
    loading: boolean;
    brands: Brand[];
    error?: string;
}

interface Action {
    type: string;
    payload?: any;
}

const initialState: BrandState = {
    loading: false,
    brands: []
};

export const brandReducer = (state: BrandState = initialState, action: Action): BrandState => {
    switch (action.type) {
        case LIST_BRAND_REQUEST:
            return { loading: true, brands: [] };
        case LIST_BRAND_SUCCESS:
            return { loading: false, brands: action.payload };
        case LIST_BRAND_FAIL:
            return { loading: false, error: action.payload, brands: [] };
        default:
            return state;
    }
};
