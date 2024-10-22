import axios from "axios";
import { 
  LIST_COLOR_FAIL, 
  LIST_COLOR_REQUEST, 
  LIST_COLOR_SUCCESS 
} from "../constants/colorConstants";
import { Dispatch } from "redux";
import api from "../utils/api";

export const manageColor = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: LIST_COLOR_REQUEST });
    const { data } = await api.get("api/v1/getcolor");
    dispatch({ type: LIST_COLOR_SUCCESS, payload: data.color });
  } catch (error: any) {
    dispatch({
      type: LIST_COLOR_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
