import axios from 'axios';
import { 
  CATEGORY_LIST_REQUEST, 
  CATEGORY_LIST_SUCCESS, 
  CATEGORY_LIST_FAIL, 
  SUBCATEGORY_LIST_FAIL, 
  SUBCATEGORY_LIST_SUCCESS, 
  SUBCATEGORY_LIST_REQUEST, 
  LISTSUBCATEGORY_LIST_REQUEST, 
  LISTSUBCATEGORY_LIST_SUCCESS, 
  LISTSUBCATEGORY_LIST_FAIL 
} from '../constants/categoryConstants';
import { Dispatch } from 'redux';
import api from '../utils/api';

// Define a type for the expected response data
// interface CategoryData {
//   category: any; // Adjust this type according to your actual data
//   subcategory: any; // Adjust this type according to your actual data
// }

export const manageAllCategory = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST });
    const { data } = await api.get(`api/v1/managefrontcategory`);
    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data.category });
  } catch (error: any) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const managesubCategory = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: SUBCATEGORY_LIST_REQUEST });
    const { data } = await api.get(`api/v1/managefrontsubcategory/${id}`);
    dispatch({ type: SUBCATEGORY_LIST_SUCCESS, payload: data.subcategory });
  } catch (error: any) {
    dispatch({
      type: SUBCATEGORY_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const managelistsubCategory = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: LISTSUBCATEGORY_LIST_REQUEST });
    const { data } = await api.get(`api/v1/managefrontcategory/${id}`);
    dispatch({ type: LISTSUBCATEGORY_LIST_SUCCESS, payload: data.category });
  } catch (error: any) {
    dispatch({
      type: LISTSUBCATEGORY_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
