import { 
    ADD_SIGNUP_REQUEST, 
    ADD_SIGNUP_SUCCESS, 
    ADD_SIGNUP_FAIL, 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    LOGIN_FAIL, 
    AUTH_CHECK_REQUEST, 
    AUTH_CHECK_SUCCESS, 
    AUTH_CHECK_FAIL,
    USER_LOGOUT
  } from "../constants/userConstants";
  
  interface UserState {
    register: any[]; // Adjust 'any[]' to the specific type of your register data
    loginInfo: any[]; // Adjust 'any[]' to the specific type of your login info
    authcheck: any[]; // Adjust 'any[]' to the specific type of your auth check data
    loading?: boolean;
    error?: string;
  }
  
  interface UserAction {
    type: string;
    payload?: any; // Adjust 'any' to the specific type of your payload
  }
  
  export const userReducer = (state: UserState = { register: [], loginInfo: [], authcheck: [] }, action: UserAction): UserState => {
    console.log(action)
    switch (action.type) {
      case ADD_SIGNUP_REQUEST:
        return { ...state,loading: true, register: [], loginInfo: state.loginInfo, authcheck: state.authcheck };
      case ADD_SIGNUP_SUCCESS:
        return { ...state,loading: false, register: action.payload, loginInfo: state.loginInfo, authcheck: state.authcheck };
      case ADD_SIGNUP_FAIL:
        return { ...state,loading: false, error: action.payload, register: [], loginInfo: state.loginInfo, authcheck: state.authcheck };
      case LOGIN_REQUEST:
        return { ...state,loading: true, register: state.register, loginInfo: [], authcheck: state.authcheck };
      case LOGIN_SUCCESS:
        return { ...state,loading: false, register: state.register, loginInfo: action.payload, authcheck: state.authcheck };
      case LOGIN_FAIL:
        return { ...state,loading: false, error: action.payload, register: state.register, loginInfo: [], authcheck: state.authcheck };
        case USER_LOGOUT:
        return { ...state,loading: false, loginInfo: [] };
      case AUTH_CHECK_REQUEST:
        return { ...state,loading: true, register: state.register, loginInfo: state.loginInfo, authcheck: [] };
      case AUTH_CHECK_SUCCESS:
        return { ...state,loading: false, register: state.register, loginInfo: state.loginInfo, authcheck: action.payload };
      case AUTH_CHECK_FAIL:
        return { ...state,loading: false, error: action.payload, register: state.register, loginInfo: state.loginInfo, authcheck: [] };
      default:
        return state;
    }
  };
  