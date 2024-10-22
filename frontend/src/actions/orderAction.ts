import axios from "axios";
import { ORDER_FAIL, ORDER_REQUEST, ORDER_SUCCESS } from "../constants/orderConstants";
import { Dispatch } from "redux";
import api from "../utils/api";

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
    const { data } = await api.post<OrderData>("api/v1/createorder", input);
    dispatch({ type: ORDER_SUCCESS, payload: data.order });
  } catch (error: any) {
    dispatch({
      type: ORDER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.response,
    });
  }
};
