import axios from "axios";
import { ACTIVE_BRAND_FAIL, ACTIVE_BRAND_REQUEST, ACTIVE_BRAND_SUCCESS, ADD_BRAND_FAIL, ADD_BRAND_REQUEST, ADD_BRAND_SUCCESS, DELETE_BRAND_FAIL, DELETE_BRAND_REQUEST, DELETE_BRAND_SUCCESS, LIST_BRAND_FAIL, LIST_BRAND_REQUEST, LIST_BRAND_SUCCESS } from "../constants/brandConstants";
import api from "../utils/api";
import { Dispatch } from 'redux';

interface BrandData {
    brand: {
        id: string;
        name: string;
        // Add other properties as needed
    }[];
}

interface Error {
    response: {
        data: {
            message: string;
        };
    };
    message: string;
}
export const addbrand = (input: any, toast: { success: (msg: string) => void, error: (msg: string) => void }) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: ADD_BRAND_REQUEST });

        const response = await api.post("/api/v1/addbrand", input);
        dispatch({ type: ADD_BRAND_SUCCESS, payload: response.data });
        toast.success(response.data.message);
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message);
        }
        dispatch({
            type: ADD_BRAND_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};
type managebrand = (currentPage: number, limit: number, search: string, setPageCount: (count: number) => void, setPageindex: (index: number) => void) => (dispatch: Dispatch) => Promise<void>;
export const brandPagination: managebrand = (currentPage, limit, search, setPageCount, setPageindex) => async (dispatch) => {
    try {
        dispatch({ type: LIST_BRAND_REQUEST });

        const { data } = await api.get(`/api/v1/brandpagination?page=${currentPage}&limit=${limit}&search=${search}`);
        
        dispatch({ type: LIST_BRAND_SUCCESS, payload: data.results });
        setPageCount(data.results.pageCount);
        setPageindex(data.results.pageindex);
    } catch (error: unknown) {
        const err = error as Error;
        dispatch({
            type: LIST_BRAND_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        });
    }
};

export const manageBrand = () => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: LIST_BRAND_REQUEST });

        const { data } = await api.get("/api/v1/getbrand");
        dispatch({ type: LIST_BRAND_SUCCESS, payload: data.brand });

    } catch (error: any) {
        const err = error as Error;
        dispatch({
            type: LIST_BRAND_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        });
    }
};


export const activeBrand = (input: any, toast: { success: (msg: string) => void, error: (msg: string) => void }) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: ACTIVE_BRAND_REQUEST });

        const response = await api.post("/api/v1/activeBRAND", input);
        dispatch({ type: ACTIVE_BRAND_SUCCESS, payload: response.data });
        toast.success(response.data.message);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
            dispatch({
                type: ACTIVE_BRAND_FAIL,
                payload: error.response.data.message,
            });
        } else {
            toast.error(error.message);
            dispatch({
                type: ACTIVE_BRAND_FAIL,
                payload: error.message,
            });
        }
    }
};

export const deleteAllbrand = (input: any, toast: { success: (msg: string) => void, error: (msg: string) => void }) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: DELETE_BRAND_REQUEST });

        const response = await api.post("/api/v1/deleteallBRAND", input);
        dispatch({ type: DELETE_BRAND_SUCCESS, payload: response.data });
        toast.success(response.data.message);
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message);
        }
        dispatch({
            type: DELETE_BRAND_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const deleteBrand = (input: any, toast: { success: (msg: string) => void, error: (msg: string) => void }) => async (dispatch: Dispatch) => {
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

