import axios from 'axios';
import { 
  PRODUCTBYID_FAILS, 
  PRODUCTBYID_REQUEST, 
  PRODUCTBYID_SUCCESS, 
  PRODUCT_LIST_FAILS, 
  PRODUCT_LIST_REQUEST, 
  PRODUCT_LIST_SUCCESS 
} from '../constants/productConstants';
import { Dispatch } from 'redux';
import api from '../utils/api';

export const listProducts = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await api.get("api/v1/products", { withCredentials: true });
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: PRODUCT_LIST_FAILS,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const productById = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: PRODUCTBYID_REQUEST });
    await api.get(`api/v1/productbyid/${id}`)
      .then((response) => {
        dispatch({ type: PRODUCTBYID_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: PRODUCTBYID_FAILS, payload: error.response && error.response.data.message ? error.response.data.message : error.response });
      });
  } catch (error: any) {
    dispatch({
      type: PRODUCTBYID_FAILS,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
