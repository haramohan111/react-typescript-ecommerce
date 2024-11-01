import axios from 'axios';
import {
  ADD_SIGNUP_FAIL,
  ADD_SIGNUP_REQUEST,
  ADD_SIGNUP_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_FAIL,
  USER_REQUEST,
  USER_SUCCESS
} from '../constants/userConstants';
import { Dispatch } from 'redux';
import api, { apiUrl } from '../utils/api';
import Cookies from 'js-cookie';
interface SignupData {
  // Define your data structure here
  [key: string]: any;
}

interface LoginValues {
  // Define your login values structure here
  [key: string]: any;
}



export const signup = (data: SignupData, navigate: any, toast: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: ADD_SIGNUP_REQUEST });
    await api.post('api/v1/signup', data)
      .then((response) => {
        dispatch({ type: ADD_SIGNUP_SUCCESS, payload: response.data });
        toast.success("User register successfully");
        navigate("/account/signin");
      })
      .catch((error) => {
        dispatch({
          type: ADD_SIGNUP_FAIL,
          payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
      });
  } catch (error: any) {
    dispatch({
      type: ADD_SIGNUP_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const loginUser = (values: LoginValues, navigate: (path: string) => void, toast: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: USER_REQUEST });
    const { data } = await api.post('api/v1/userlogin', { mobileNo: "9556213318", password: "123456789" }, { withCredentials: true });
    if (data.token == null) {
      dispatch({ type: USER_SUCCESS, payload: data });
      toast.success("User login successfully");
      localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
      localStorage.setItem("refreshToken", JSON.stringify(data.refreshToken));
      const sessionId = Cookies.get('cart_session_id'); // Replace with your actual cookie name
      console.log(sessionId)
      if (sessionId) {
        navigate('/cart'); // Redirect to the cart page
      }else{
        navigate("/")
      }
     
    }


  } catch (error: any) {
    dispatch({
      type: USER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const userlogout = (navigate: any) => async (dispatch: Dispatch) => {

  try {

    dispatch({ type: USER_REQUEST });
    const { data } = await axios.post(`${apiUrl}/api/v1/userlogout`,null,{ withCredentials: true });
    console.log("from logout",data);
    //dispatch({ type: USER_VERIFY_SUCCESS, payload:{success: false, message: "Session out"} });
    dispatch({ type: USER_SUCCESS, payload: data });
    if(data.success=="false"){
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }

    //navigate("/admin");
  } catch (error: any) {
    dispatch({ type: USER_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    console.log(error);
    console.log("error logout");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
  }
};

export const verifyUser = () => async (dispatch: Dispatch) => {

  try {
    dispatch({ type: USER_REQUEST });
    const { data } = await api.post(`/api/v1/userverify`, null, { withCredentials: true });
    console.log("action", data)
    dispatch({ type: USER_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({ type: USER_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    console.error(error);
    // localStorage.removeItem("accessToken");
    // localStorage.removeItem("refreshToken");
  }
};

