import { LIST_ORDER_FAIL, LIST_ORDER_REQUEST, LIST_ORDER_SUCCESS } from "../constants/orderConstants";

interface Order {
    id: string;
    // Add other properties as needed
}

interface OrderState {
    loading: boolean;
    orders: Order[];
    error?: string;
}

interface Action {
    type: string;
    payload?: any;
}

const initialOrderState: OrderState = {
    loading: false,
    orders: []
};

export const orderReducer = (state: OrderState = initialOrderState, action: Action): OrderState => {
    switch (action.type) {
        case LIST_ORDER_REQUEST:
            return { loading: true, orders: [] };
        case LIST_ORDER_SUCCESS:
            return { loading: false, orders: action.payload };
        case LIST_ORDER_FAIL:
            return { loading: false, error: action.payload, orders: [] };
        default:
            return state;
    }
};
