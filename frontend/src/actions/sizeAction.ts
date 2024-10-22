import axios from "axios";
import { 
  LIST_SIZE_FAIL, 
  LIST_SIZE_REQUEST, 
  LIST_SIZE_SUCCESS 
} from "../constants/sizeConstants";
import { Dispatch } from "redux";
import api from "../utils/api";

export const manageSize = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: LIST_SIZE_REQUEST });
    const { data } = await api.get("api/v1/getsize");
    dispatch({ type: LIST_SIZE_SUCCESS, payload: data.size });
  } catch (error: any) {
    dispatch({
      type: LIST_SIZE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
