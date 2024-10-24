import { Dispatch } from 'redux';
import api from '../utils/api';
import { ACTIVE_COLOR_FAIL, ACTIVE_COLOR_REQUEST, ACTIVE_COLOR_SUCCESS, ADD_COLOR_FAIL, ADD_COLOR_REQUEST, ADD_COLOR_SUCCESS, DELETE_COLOR_FAIL, DELETE_COLOR_REQUEST, DELETE_COLOR_SUCCESS, LIST_COLOR_FAIL, LIST_COLOR_REQUEST, LIST_COLOR_SUCCESS } from '../constants/colorConstants';


interface Error {
    response?: {
        data: {
            message: string;
        };
    };
    message: string;
}

export const addColor = (input: any, toast: { success: (msg: string) => void, error: (msg: string) => void }) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: ADD_COLOR_REQUEST });

        const response = await api.post("/api/v1/addcolor", input);
        dispatch({ type: ADD_COLOR_SUCCESS, payload: response.data });
        toast.success(response.data.message);
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message);
        }
        dispatch({
            type: ADD_COLOR_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};
export const manageColor = () => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: LIST_COLOR_REQUEST });

        const { data } = await api.get("/api/v1/getcolor");
        dispatch({ type: LIST_COLOR_SUCCESS, payload: data.color });
    } catch (error: any) {
        const err = error as Error;
        dispatch({
            type: LIST_COLOR_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        });
    }
};
type manageColor = (currentPage: number, limit: number, search: string, setPageCount: (count: number) => void, setPageindex: (index: number) => void) => (dispatch: Dispatch) => Promise<void>;
export const colorPagination: manageColor = (currentPage, limit, search, setPageCount, setPageindex) => async (dispatch) => {
    try {
        dispatch({ type: LIST_COLOR_REQUEST });

        const { data } = await api.get(`/api/v1/Colorpagination?page=${currentPage}&limit=${limit}&search=${search}`);
        
        dispatch({ type: LIST_COLOR_SUCCESS, payload: data.results });
        setPageCount(data.results.pageCount);
        setPageindex(data.results.pageindex);
    } catch (error: unknown) {
        const err = error as Error;
        dispatch({
            type: LIST_COLOR_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        });
    }
};


export const activeColor = (input: any, toast: { success: (msg: string) => void, error: (msg: string) => void }) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: ACTIVE_COLOR_REQUEST });

        const response = await api.post("/api/v1/activecolor", input);
        dispatch({ type: ACTIVE_COLOR_SUCCESS, payload: response.data });
        toast.success(response.data.message);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
            dispatch({
                type: ACTIVE_COLOR_FAIL,
                payload: error.response.data.message,
            });
        } else {
            toast.error(error.message);
            dispatch({
                type: ACTIVE_COLOR_FAIL,
                payload: error.message,
            });
        }
    }
};

export const deleteAllcolor = (input: any, toast: { success: (msg: string) => void, error: (msg: string) => void }) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: DELETE_COLOR_REQUEST });

        const response = await api.post("/api/v1/deleteallcolor", input);
        dispatch({ type: DELETE_COLOR_SUCCESS, payload: response.data });
        toast.success(response.data.message);
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message);
        }
        dispatch({
            type: DELETE_COLOR_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const deleteColor = (input: any, toast: { success: (msg: string) => void, error: (msg: string) => void }) => async (dispatch: Dispatch) => {
    try {
        // dispatch({ type: DELETE_CATEGORY_REQUEST });
        const response = await api.post("/api/v1/deletecategory", input);
        // dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: response.data });
        toast.success(response.data.message);
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message);
        }
        // dispatch({
        //     type: DELETE_CATEGORY_FAIL,
        //     payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        // });
    }
}
