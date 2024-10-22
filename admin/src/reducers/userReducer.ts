import { USER_FAIL, USER_REQUEST, USER_SUCCESS, USER_LOGOUT } from "../constants/userConstants";

interface User {
    id: string;
    name: string;
    // Add other properties as needed
}

interface LoginInfo {
    token: string;
    userId: string;
    // Add other properties as needed
}

interface UserState {
    
    loading: boolean;
    userinfo: User[];
    error?: string;
    loginInfo?: LoginInfo | null;
}

interface Action {
    type: string;
    payload?: any;
}

const initialUserState: UserState = {
    loading: false,
    userinfo: [],
    loginInfo: null,
};

export const userReducer = (state: UserState = initialUserState, action: Action): UserState => {
    switch (action.type) {
        case USER_REQUEST:
            return { ...state,loading: true, userinfo: [] };
        case USER_SUCCESS:
            return { ...state,loading: false, userinfo: action.payload };
        case USER_FAIL:
            return { ...state,loading: false, error: action.payload, userinfo: [] };
        case USER_LOGOUT:
            return { ...state,loading: false, userinfo: [],loginInfo: null  };
        default:
            return state;
    }
};
