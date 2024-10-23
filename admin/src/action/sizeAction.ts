import { Dispatch } from 'redux';
import api from '../utils/api';
import { ADD_SIZE_FAIL, ADD_SIZE_REQUEST, ADD_SIZE_SUCCESS, LIST_SIZE_FAIL, LIST_SIZE_REQUEST, LIST_SIZE_SUCCESS } from '../constants/sizeConstants';
import { ADD_CATEGORY_FAIL, ADD_CATEGORY_SUCCESS } from '../constants/categoryConstants';

interface Error {
    response?: {
        data: {
            message: string;
        };
    };
    message: string;
}


export const addSize = (input: any, toast: { success: (msg: string) => void, error: (msg: string) => void }) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: ADD_SIZE_REQUEST });

        const response = await api.post("/api/v1/addsize", input);
        dispatch({ type: ADD_SIZE_SUCCESS, payload: response.data });
        toast.success(response.data.message);
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message);
        }
        dispatch({
            type: ADD_SIZE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const manageSize = () => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: LIST_SIZE_REQUEST });

        const { data } = await api.get("/api/v1/getsize");
        dispatch({ type: LIST_SIZE_SUCCESS, payload: data.size });
    } catch (error: any) {
        const err = error as Error;
        dispatch({
            type: LIST_SIZE_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message,
        });
    }
};
