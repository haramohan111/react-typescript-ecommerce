import axios from "axios";
import { ORDER_FAIL, ORDER_REQUEST, ORDER_SUCCESS } from "../constants/orderConstants";
import { Dispatch } from "redux";
import api from "../utils/api";
import { CUSTOMER_LIST_FAIL, CUSTOMER_LIST_REQUEST, CUSTOMER_LIST_SUCCESS } from "../constants/customerConstants";

interface OrderInput {
  // Define the shape of your input object here
  // For example:
  // item: string;
  // quantity: number;
  [key: string]: any;
}

interface OrderData {
  order: any; // Adjust this type according to your actual data
}

export const createOrder = (input: OrderInput) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: ORDER_REQUEST });
    const { data } = await api.post<OrderData>("api/v1/createorder", input,{withCredentials: true });
    dispatch({ type: ORDER_SUCCESS, payload: data.order });
  } catch (error: any) {
    dispatch({
      type: ORDER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.response,
    });
  }
};

export const manageCustomer = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: CUSTOMER_LIST_REQUEST });
    const { data } = await api.get(`api/v1/customeraddress`);
    dispatch({ type: CUSTOMER_LIST_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: CUSTOMER_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
