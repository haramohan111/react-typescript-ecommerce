import axios from "axios"
import { ADD_LIST_SUBCATEGORY_FAIL, ADD_LIST_SUBCATEGORY_REQUEST, ADD_LIST_SUBCATEGORY_SUCCESS, LIST_SUBCATEGORY_REQUEST, LIST_SUBCATEGORY_SUCCESS, LIST_SUBCATEGORY_FAIL } from '../constants/listsubcategoryConstants'
import { LIST_SUBCATEGORYBYID_FAIL, LIST_SUBCATEGORYBYID_REQUEST,LIST_SUBCATEGORYBYID_SUCCESS } from "../constants/listsubcategoryConstants"

import { Dispatch } from 'redux';
import api from '../utils/api';

interface Error {
    response?: {
        data: {
            message: string;
        };
    };
    message: string
}

export const addlistSubcategory = (input: any, toast: { success: (msg: string) => void, error: (msg: string) => void }) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: ADD_LIST_SUBCATEGORY_REQUEST });

        const response = await api.post("/api/v1/addlistsubcategory", input);
        toast.success(response.data.message);
        dispatch({ type: ADD_LIST_SUBCATEGORY_SUCCESS, payload: response.data.listsubcategory });

    } catch (error: any) {
        const err = error as Error;
        if (err.response && err.response.data && err.response.data.message) {
            toast.error(error.response.data.message);
            dispatch({
                type: ADD_LIST_SUBCATEGORY_FAIL,
                payload: err.response.data.message,
            });
        } else {
            toast.error(err.message);
            dispatch({
                type: ADD_LIST_SUBCATEGORY_FAIL,
                payload: err.message,
            });
        }
    }
};


export const manageSubcategory = () => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: LIST_SUBCATEGORY_REQUEST });

        const { data } = await api.get("/api/v1/listsubcategory");
        dispatch({ type: LIST_SUBCATEGORY_SUCCESS, payload: data.listsubcategory });
    } catch (error: any) {
        const err = error as Error;
        dispatch({
            type: LIST_SUBCATEGORY_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message,
        });
    }
};

type ManageListSubcategoryPagination = (
    currentPage: number,
    limit: number,
    search: string,
    setPageCount: (count: number) => void,
    setPageindex: (index: number) => void
) => (dispatch: Dispatch) => Promise<void>;

export const manageListSubcategoryPagination: ManageListSubcategoryPagination = (currentPage, limit, search, setPageCount, setPageindex) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: LIST_SUBCATEGORY_REQUEST });

        const { data } = await api.get(`/api/v1/listsubcategorypagination?page=${currentPage}&limit=${limit}&search=${search}`);
        dispatch({ type: LIST_SUBCATEGORY_SUCCESS, payload: data.results });
        setPageCount(data.results.pageCount);
        setPageindex(data.results.pageindex);
    } catch (error: any) {
        const err = error as Error;
        dispatch({
            type: LIST_SUBCATEGORY_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message,
        });
    }
};

export const getListsubcategoryById = (subcat_id: string) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: LIST_SUBCATEGORYBYID_REQUEST });

        const { data } = await api.get(`/api/v1/getlistsubcategorybyid/${subcat_id}`);
        dispatch({ type: LIST_SUBCATEGORYBYID_SUCCESS, payload: data });
    } catch (error: any) {
        const err = error as Error;
        dispatch({
            type: LIST_SUBCATEGORYBYID_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message,
        });
    }
};

export const deleteAllListSubcategory = (input: any, toast: { success: (msg: string) => void, error: (msg: string) => void }) => async (dispatch: Dispatch) => {
    try {
        // console.log(dispatch({ type: DELETE_SUBCATEGORY_REQUEST }));
        // dispatch({ type: DELETE_SUBCATEGORY_REQUEST });
        const response = await api.post("/api/v1/deletealllistsubcategory", input);
        // dispatch({ type: DELETE_SUBCATEGORY_SUCCESS, payload: response.data });
        toast.success(response.data.message);
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message);
        }
        // dispatch({
        //     type: DELETE_SUBCATEGORY_FAIL,
        //     payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        // });
    }
};


export const addexcelListSubCategory = (input: any, toast: { success: (msg: string) => void, error: (msg: string) => void }) => async (dispatch: Dispatch) => {
    try {
        // dispatch({ type: ADD_CATEGORY_REQUEST });
        const response = await api.post("/api/v1/importexcellistsubcategory", input);
        // dispatch({ type: ADD_CATEGORY_SUCCESS, payload: response.data });
        toast.success(response.data.message);
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message);
        }
        // dispatch({
        //     type: ADD_CATEGORY_FAIL,
        //     payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        // });
    }
};
