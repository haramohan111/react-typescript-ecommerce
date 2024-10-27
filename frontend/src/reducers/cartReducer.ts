import { 
    ADDTO_CART_FAIL, ADDTO_CART_REQUEST, ADDTO_CART_SUCCESS, 
    CART_ADD_ITEM_BEFORE_LOGIN, CART_LIST_FAIL, CART_LIST_REQUEST, 
    CART_LIST_SUCCESS, CART_REMOVE_ITEM_BEFORE_LOGIN, COUPON_FAIL, 
    COUPON_REQUEST, COUPON_SUCCESS, DECQTY_FAIL, DECQTY_REQUEST, 
    DECQTY_SUCCESS, INCQTY_FAIL, INCQTY_REQUEST, INCQTY_SUCCESS, 
    REMOVE_CART_FAIL, REMOVE_CART_REQUEST, REMOVE_CART_SUCCESS ,SAVE_SHIPPING_ADDRESS
  } from "../constants/cartConstants";

  
  interface CartState {
    cart: any[]; // Adjust this type according to your actual data structure
    cartItems: any[]; // Adjust this type according to your actual data structure
    loading?: boolean;
    error?: string;
    shippingaddress?: any; // Adjust this type according to your actual data structure
  }
  
  interface CartAction {
    type: string;
    payload?: any; // Adjust this type according to your actual data structure
  }
  
  export const cartReducer = (state: CartState = { cart: [], cartItems: [] }, action: CartAction): CartState => {
    switch (action.type) {
      case ADDTO_CART_REQUEST:
        return { ...state,loading: true, cart: [], cartItems: state.cartItems };
      case ADDTO_CART_SUCCESS:
        return { ...state,loading: false, cart: action.payload, cartItems: state.cartItems };
      case ADDTO_CART_FAIL:
        return { ...state,loading: false, error: action.payload, cart: state.cart, cartItems: state.cartItems };
      case CART_ADD_ITEM_BEFORE_LOGIN:
        const item = action.payload;
        const existItem = state.cartItems.find((x) => x.product === item.product);
        if (existItem) {
          return { 
            ...state, 
            cartItems: state.cartItems.map((x) => x.product === existItem.product ? item : x) 
          };
        } else {
          return { 
            ...state, 
            cartItems: [...state.cartItems, item] 
          };
        }
      case CART_REMOVE_ITEM_BEFORE_LOGIN:
        return { 
          ...state, 
          cartItems: state.cartItems.filter((x) => x.product !== action.payload) 
        };
      case CART_LIST_REQUEST:
        return { ...state,loading: true, cart: [], cartItems: state.cartItems };
      case CART_LIST_SUCCESS:
        return { ...state,loading: false, cart: action.payload, cartItems: state.cartItems };
      case CART_LIST_FAIL:
        return { ...state,loading: false, error: action.payload, cart: state.cart, cartItems: state.cartItems };
      case INCQTY_REQUEST:
        return { ...state,loading: true, cart: [], cartItems: state.cartItems };
      case INCQTY_SUCCESS:
        return { ...state,loading: false, cart: action.payload, cartItems: state.cartItems };
      case INCQTY_FAIL:
        return { ...state,loading: false, error: action.payload, cart: state.cart, cartItems: state.cartItems };
      case DECQTY_REQUEST:
        return { ...state,loading: true, cart: [], cartItems: state.cartItems };
      case DECQTY_SUCCESS:
        return { ...state,loading: false, cart: action.payload, cartItems: state.cartItems };
      case DECQTY_FAIL:
        return { ...state,loading: false, error: action.payload, cart: state.cart, cartItems: state.cartItems };
      case REMOVE_CART_REQUEST:
        return { ...state,loading: true, cart: [], cartItems: state.cartItems };
      case REMOVE_CART_SUCCESS:
        return { ...state,loading: false, cart: action.payload, cartItems: state.cartItems };
      case REMOVE_CART_FAIL:
        return { ...state,loading: false, error: action.payload, cart: state.cart, cartItems: state.cartItems };
      case COUPON_REQUEST:
        return { ...state,loading: true, cart: [], cartItems: state.cartItems };
      case COUPON_SUCCESS:
        return { ...state,loading: false, cart: action.payload, cartItems: state.cartItems };
      case COUPON_FAIL:
        return { ...state,loading: false, error: action.payload, cart: state.cart, cartItems: state.cartItems };
      case SAVE_SHIPPING_ADDRESS:
        return { ...state, loading: false, shippingaddress: action.payload };
      default:
        return state;
    }
  };
  