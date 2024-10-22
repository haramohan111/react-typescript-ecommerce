import { ORDER_FAIL, ORDER_REQUEST, ORDER_SUCCESS } from "../constants/orderConstants";

interface OrderState {
  orders: any[]; // Adjust 'any[]' to the specific type of your orders
  loading?: boolean;
  error?: string;
}

interface OrderAction {
  type: string;
  payload?: any; // Adjust 'any' to the specific type of your payload
}

export const orderReducer = (state: OrderState = { orders: [] }, action: OrderAction): OrderState => {
  switch (action.type) {
    case ORDER_REQUEST:
      return { loading: true, orders: [] };
    case ORDER_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_FAIL:
      return { loading: false, error: action.payload, orders: [] };
    default:
      return state;
  }
};
