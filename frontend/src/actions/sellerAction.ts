import axios from "axios";
import { 
  LIST_SELER_FAIL, 
  LIST_SELER_REQUEST, 
  LIST_SELER_SUCCESS 
} from "../constants/sellerConstants";
import { Dispatch } from "redux";
import api from "../utils/api";

export const manageSeller = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: LIST_SELER_REQUEST });
    const { data } = await api.get("api/v1/getseller");
    dispatch({ type: LIST_SELER_SUCCESS, payload: data.seller });
  } catch (error: any) {
    dispatch({
      type: LIST_SELER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
