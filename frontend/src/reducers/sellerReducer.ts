import { LIST_SELER_FAIL, LIST_SELER_REQUEST, LIST_SELER_SUCCESS } from "../constants/sellerConstants";

interface SellerState {
  sellers: any[]; // Adjust 'any[]' to the specific type of your sellers
  loading?: boolean;
  error?: string;
}

interface SellerAction {
  type: string;
  payload?: any; // Adjust 'any' to the specific type of your payload
}

export const sellerReducer = (state: SellerState = { sellers: [] }, action: SellerAction): SellerState => {
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
