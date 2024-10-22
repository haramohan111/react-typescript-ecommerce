import axios from 'axios';
import { 
  ADD_SIGNUP_FAIL, 
  ADD_SIGNUP_REQUEST, 
  ADD_SIGNUP_SUCCESS, 
  LOGIN_FAIL, 
  LOGIN_REQUEST, 
  LOGIN_SUCCESS, 
  USER_LOGOUT 
} from '../constants/userConstants';
import { Dispatch } from 'redux';
import api from '../utils/api';

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
    dispatch({ type: LOGIN_REQUEST });
    const { data } = await api.post('api/v1/userlogin', {mobileNo: "9556213318", password: "123456789"});
    if(data.token==null){
      dispatch({ type: LOGIN_SUCCESS, payload: data });
    
      toast.success("User login successfully");
      localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
      localStorage.setItem("refreshToken", JSON.stringify(data.refreshToken));
      navigate("/")
    }


  } catch (error: any) {
    dispatch({ 
      type: LOGIN_FAIL, 
      payload: error.response && error.response.data.message ? error.response.data.message : error.message 
    });
  }
};

export const userlogout = (navigate: any) => async (dispatch: Dispatch) => {

  // await api.get("api/v1/userlogout")
  //   .then((response) => {
  //     if (response.data) {
  //       dispatch({ type: USER_LOGOUT });
  //       localStorage.removeItem("accessToken");
  //       localStorage.removeItem("refreshToken");
  //     }
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

    try {
      const { data } = await api.post("/api/v1/userlogout");
      console.log(data);
      dispatch({ type: USER_LOGOUT });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      //navigate("/admin");
  } catch (error: any) {
      console.log(error);
      localStorage.removeItem("refreshToken");
  }
};

// export const authCheck = (navigate) => async (dispatch) => {
//     try{
//         dispatch({ type: AUTH_CHECK_REQUEST })
//         const {data} =  await axios.post('api/v1/frontauthcheck',values)
//                 dispatch({ type: AUTH_CHECK_SUCCESS, payload: data })
//                 if (data.ok) {
//                     navigate("/account/signin")
//                   } 
//     }catch(error){
//         dispatch({ type: AUTH_CHECK_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
//     }
// }
