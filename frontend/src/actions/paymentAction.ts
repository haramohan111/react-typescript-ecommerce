import axios from "axios";
import { Dispatch } from "redux";
import api from "../utils/api";

interface PaymentResponse {
  // Adjust this type according to your actual data structure
  [key: string]: any;
}

export const PAYMENT = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: "PAYMENT_REQUEST" });
    api.get<PaymentResponse>(`api/v1/payment`).then((response) => {
      dispatch({ type: "PAYMENT_SUCCESS", payload: response.data });
    }).catch((error) => {
      dispatch({
        type: "PAYMENT_FAIL",
        payload: error.response && error.response.data.message ? error.response.data.message : error.response,
      });
    });
  } catch (error: any) {
    dispatch({
      type: "PAYMENT_FAIL",
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
