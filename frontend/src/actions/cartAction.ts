import axios from 'axios';
import {
  ADDTO_CART_FAIL,
  ADDTO_CART_REQUEST,
  ADDTO_CART_SUCCESS,
  CART_ADD_ITEM_BEFORE_LOGIN,
  CART_LIST_FAIL,
  CART_LIST_REQUEST,
  CART_LIST_SUCCESS,
  CART_REMOVE_ITEM_BEFORE_LOGIN,
  COUPON_FAIL,
  COUPON_REQUEST,
  COUPON_SUCCESS,
  DECQTY_FAIL,
  DECQTY_REQUEST,
  DECQTY_SUCCESS,
  INCQTY_FAIL,
  INCQTY_REQUEST,
  INCQTY_SUCCESS,
  REMOVE_CART_FAIL,
  REMOVE_CART_REQUEST,
  REMOVE_CART_SUCCESS,
  SAVE_SHIPPING_ADDRESS
} from '../constants/cartConstants';


import { Dispatch } from 'redux';
import api from '../utils/api';

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
}

interface CartItem {
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
}

interface CartState {
  cartItems: CartItem[];
}

export const userCart = (id: string, toast: any, navigate: any, url: string) => async (dispatch: Dispatch, getState: () => { cartreducer: CartState }) => {
  try {
    
    const { data } = await api.get<Product>(`api/v1/productbyid/${id}`);
    dispatch({
      type: CART_ADD_ITEM_BEFORE_LOGIN,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty: 1,
      },
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cartreducer.cartItems));
  } catch (e) {
    // Handle error
  }
};

export const addToCart = (
  id: string,
  toast: any,
  navigate: any,
  cartc: any,
  setCartc: any,
  url: string,
  qty: number
) => async (dispatch: Dispatch, getState: any) => {
  try {
    dispatch({ type: ADDTO_CART_REQUEST });
    await api.post(`/api/v1/addtocart/${id}/${qty}`,null,{withCredentials: true }).then((response) => {
      dispatch({ type: ADDTO_CART_SUCCESS, payload: response.data });
      let sum = 0;
      response.data.map((item: any) => {
        return (sum += item.quantity);
      });
      setCartc([...cartc, response.data]);

      if (url == 'cart') {
        toast("Item Added successfully");
        navigate("/cart");
      } else {
        navigate("/checkout");
      }
    }).catch((error) => {
      dispatch({
        type: ADDTO_CART_FAIL,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
      });
    });
  } catch (error: any) {
    dispatch({
      type: ADDTO_CART_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const removeFromCartBeforeLogin = (id: string) => (dispatch: Dispatch, getState: any) => {
  dispatch({ type: CART_REMOVE_ITEM_BEFORE_LOGIN, payload: id });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const CartList = () => (dispatch: Dispatch) => {
  try {
    dispatch({ type: CART_LIST_REQUEST });
    api.get(`/api/v1/cart`,{withCredentials: true }).then((response) => {
      dispatch({ type: CART_LIST_SUCCESS, payload: response.data });
    }).catch((error) => {
      dispatch({
        type: CART_LIST_FAIL,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
      });
    });
  } catch (error: any) {
    dispatch({
      type: CART_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const increaseQty = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: INCQTY_REQUEST });
    api.get(`/api/v1/incqty/${id}`,{withCredentials: true }).then((response) => {
      dispatch({ type: INCQTY_SUCCESS, payload: response.data });
    }).catch((error) => {
      dispatch({
        type: INCQTY_FAIL,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
      });
    });
  } catch (error: any) {
    dispatch({
      type: INCQTY_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const decreaseQty = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: DECQTY_REQUEST });
    api.get(`/api/v1/descqty/${id}`,{withCredentials: true }).then((response) => {
      dispatch({ type: DECQTY_SUCCESS, payload: response.data });
    }).catch((error) => {
      dispatch({
        type: DECQTY_FAIL,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
      });
    });
  } catch (error: any) {
    dispatch({
      type: DECQTY_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const removeCart = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: REMOVE_CART_REQUEST });
    api.get(`/api/v1/deletecart/${id}`,{withCredentials: true }).then((response) => {
      dispatch({ type: REMOVE_CART_SUCCESS, payload: response.data });
    }).catch((error) => {
      dispatch({
        type: REMOVE_CART_FAIL,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
      });
    });
  } catch (error: any) {
    dispatch({
      type: REMOVE_CART_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const coupon = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: COUPON_REQUEST });
    api.get(`/api/v1/coupon/${id}`).then((response) => {
      dispatch({ type: COUPON_SUCCESS, payload: response.data });
    }).catch((error) => {
      dispatch({
        type: COUPON_FAIL,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
      });
    });
  } catch (error: any) {
    dispatch({
      type: COUPON_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const saveShippingAddress = (data: any) => async (dispatch: Dispatch) => {
  dispatch({ type: SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem("shippingaddress", JSON.stringify(data));
};
