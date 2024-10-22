import { 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAILS, 
    PRODUCTBYID_REQUEST, 
    PRODUCTBYID_SUCCESS, 
    PRODUCTBYID_FAILS 
  } from '../constants/productConstants';
  
  interface ProductState {
    products: any[]; // Adjust 'any[]' to the specific type of your products
    loading?: boolean;
    error?: string;
  }
  
  interface ProductAction {
    type: string;
    payload?: any; // Adjust 'any' to the specific type of your payload
  }
  
  export const productReducer = (state: ProductState = { products: [] }, action: ProductAction): ProductState => {
    switch (action.type) {
      case PRODUCT_LIST_REQUEST:
        return { loading: true, products: [] };
      case PRODUCT_LIST_SUCCESS:
        return { loading: false, products: action.payload };
      case PRODUCT_LIST_FAILS:
        return { loading: false, error: action.payload, products: [] };
      case PRODUCTBYID_REQUEST:
        return { loading: true, products: [] };
      case PRODUCTBYID_SUCCESS:
        return { loading: false, products: action.payload };
      case PRODUCTBYID_FAILS:
        return { loading: false, error: action.payload, products: [] };
      default:
        return state;
    }
  };
  