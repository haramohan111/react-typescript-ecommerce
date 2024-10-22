import axios from 'axios'
import { ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, ADD_PRODUCT_FAIL, MANAGE_PRODUCT_REQUEST, MANAGE_PRODUCT_FAIL, MANAGE_PRODUCT_SUCCESS } from '../constants/productConstants'
import api from '../utils/api'
import { Dispatch } from 'redux';

export const addProducts = (input: any, toast: { success: (msg: string) => void, error: (msg: string) => void }) => async (dispatch: Dispatch) => {
  try {
      dispatch({ type: ADD_PRODUCT_REQUEST });

      const response = await api.post("/api/v1/addproducts", input);
      toast.success(response.data.message);
      dispatch({ type: ADD_PRODUCT_SUCCESS, payload: response.data });
  } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
          dispatch({
              type: ADD_PRODUCT_FAIL,
              payload: error.response.data.message,
          });
      } else {
          toast.error(error.message);
          dispatch({
              type: ADD_PRODUCT_FAIL,
              payload: error.message,
          });
      }
  }
};


export const manageProducts = () => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: MANAGE_PRODUCT_REQUEST });

        const response = await api.get("/api/v1/manageproducts");
        dispatch({ type: MANAGE_PRODUCT_SUCCESS, payload: response.data });
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            dispatch({
                type: MANAGE_PRODUCT_FAIL,
                payload: error.response.data.message,
            });
        } else {
            dispatch({
                type: MANAGE_PRODUCT_FAIL,
                payload: error.message,
            });
        }
    }
};


type ManageProductsPagination = (
    currentPage: number,
    limit: number,
    search: string,
    setPageCount: (count: number) => void,
    setPageindex: (index: number) => void
) => (dispatch: Dispatch) => Promise<void>;

export const manageProductsPagination: ManageProductsPagination = (currentPage, limit, search, setPageCount, setPageindex) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: MANAGE_PRODUCT_REQUEST });

        const { data } = await api.get(`/api/v1/manageproductspagination?page=${currentPage}&limit=${limit}&search=${search}`);
        dispatch({ type: MANAGE_PRODUCT_SUCCESS, payload: data.results });
        setPageCount(data.results.pageCount);
        setPageindex(data.results.pageindex);
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            dispatch({
                type: MANAGE_PRODUCT_FAIL,
                payload: error.response.data.message,
            });
        } else {
            dispatch({
                type: MANAGE_PRODUCT_FAIL,
                payload: error.message,
            });
        }
    }
};
