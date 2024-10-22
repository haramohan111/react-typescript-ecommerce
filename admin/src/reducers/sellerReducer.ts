import { LIST_SELER_FAIL, LIST_SELER_REQUEST, LIST_SELER_SUCCESS } from "../constants/sellerConstants";

interface Seller {
    id: string;
    name: string;
    // Add other properties as needed
}

interface SellerState {
    loading: boolean;
    sellers: Seller[];
    error?: string;
}

interface Action {
    type: string;
    payload?: any;
}

const initialSellerState: SellerState = {
    loading: false,
    sellers: []
};

export const sellerReducer = (state: SellerState = initialSellerState, action: Action): SellerState => {
    switch (action.type) {
        case LIST_SELER_REQUEST:
            return { loading: true, sellers: [] };
        case LIST_SELER_SUCCESS:
            return { loading: false, sellers: action.payload };
        case LIST_SELER_FAIL:
            return { loading: false, error: action.payload, sellers: [] };
        default:
            return state;
    }
};
