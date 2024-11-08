
import { USER_FAIL, USER_REQUEST, USER_SUCCESS, USER_LOGOUT } from "../constants/userConstants"
import { Cookies } from 'react-cookie'
import { redirect } from "react-router-dom"
import api from "../utils/api"
import { Dispatch } from 'redux';

interface AdminLoginResponse {
    accessToken: string;
    refreshToken: string;
    // Add other properties as needed
}

interface Error {
    response: {
        data: {
            message: string;
        };
    };
    message: string;
}


export const adminLogin = (email: string, password: string, navigate: (path: string) => void, toast: { success: (msg: string) => void }) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: USER_REQUEST });

        api.defaults.withCredentials = true;
        const { data } = await api.post("/api/v1/adminlogin", { email, password });
        
        navigate("/dashboard");
     
        
        dispatch({ type: USER_SUCCESS, payload: data });
        toast.success("Login successfully");

        localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
        localStorage.setItem("refreshToken", JSON.stringify(data.refreshToken));
    } catch (error: any) {
        const err = error as Error;
        dispatch({
            type: USER_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message,
        });
    }
};



export const logout = (navigate: (path: string) => void) => async (dispatch: Dispatch) => {
    try {
        const { data } = await api.post("/api/v1/logout");
        console.log(data);
        dispatch({ type: USER_LOGOUT });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/admin");
    } catch (error: any) {
        console.log(error);
        localStorage.removeItem("refreshToken");
    }
};  