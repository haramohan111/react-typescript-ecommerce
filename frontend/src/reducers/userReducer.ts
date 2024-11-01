import {
  ADD_SIGNUP_REQUEST,
  ADD_SIGNUP_SUCCESS,
  ADD_SIGNUP_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOGOUT,
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAIL
} from "../constants/userConstants";

interface UserState {
  register: any[]; // Replace 'any[]' with a specific type for register data
  loginInfo: any[]; // Replace 'any[]' with a specific type for login info
  authcheck: any[]; // Replace 'any[]' with a specific type for auth check data
  loading?: boolean;
  userverify: any[]; // Added userverify here
  error?: string;
}

interface UserAction {
  type: string;
  payload?: any; // Replace 'any' with a specific type for the payload
}

const initialState: UserState = {
  register: [],
  loginInfo: [],
  authcheck: [],
  loading: false,
  userverify:[], // Initial value for userverify
  error: undefined,
};

export const userReducer = (state: UserState = initialState, action: UserAction): UserState => {

  switch (action.type) {
    case ADD_SIGNUP_REQUEST:
      return { ...state, loading: true, register: [] };
    case ADD_SIGNUP_SUCCESS:
      return { ...state, loading: false, register: action.payload };
    case ADD_SIGNUP_FAIL:
      return { ...state, loading: false, error: action.payload, register: [] };
    case LOGIN_REQUEST:
      return { ...state, loading: true, loginInfo: [] };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, loginInfo: action.payload };
    case LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload, loginInfo: [] };
    case USER_LOGOUT:
      return { ...state, loading: false, loginInfo: [] };
    // case AUTH_CHECK_REQUEST:
    //   return { ...state, loading: true, authcheck: [] };
    // case AUTH_CHECK_SUCCESS:
    //   return { ...state, loading: false, authcheck: action.payload };
    // case AUTH_CHECK_FAIL:
    //   return { ...state, loading: false, error: action.payload};
    case USER_REQUEST:
      return { ...state, loading: true };
    case USER_SUCCESS:

      return { ...state, loading: false, userverify: action.payload };
    case USER_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
