import { CUSTOMER_LIST_REQUEST,CUSTOMER_LIST_SUCCESS,CUSTOMER_LIST_FAIL} from "../constants/customerConstants";
import { ORDER_FAIL, ORDER_REQUEST, ORDER_SUCCESS } from "../constants/orderConstants";


interface OrderState {
  orders: any[]; // Adjust 'any[]' to the specific type of your orders
  customers:any[];
  loading?: boolean;
  error?: string;
}

interface OrderAction {
  type: string;
  payload?: any; // Adjust 'any' to the specific type of your payload
}

export const orderReducer = (state: OrderState = {
  orders: [],
  customers: []
}, action: OrderAction): OrderState => {
  switch (action.type) {
    case ORDER_REQUEST:
      return { ...state,loading: true, orders: [] };
    case ORDER_SUCCESS:
      return { ...state,loading: false, orders: action.payload };
    case ORDER_FAIL:
      return { ...state,loading: false, error: action.payload };
      case CUSTOMER_LIST_REQUEST:
        return { ...state,loading: true, customers: [] };
      case CUSTOMER_LIST_SUCCESS:
        return { ...state,loading: false, customers: action.payload };
      case CUSTOMER_LIST_FAIL:
        return { ...state,loading: false, error: action.payload,  };
    default:
      return state;
  }
};
