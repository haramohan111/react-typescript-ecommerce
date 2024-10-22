import axios from 'axios'
import {
    CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, CATEGORY_LIST_FAIL,
    ADD_CATEGORY_REQUEST, ADD_CATEGORY_SUCCESS, ADD_CATEGORY_FAIL,
    UPDATE_CATEGORY_REQUEST,UPDATE_CATEGORY_SUCCESS,UPDATE_CATEGORY_FAIL,
    ACTIVE_CATEGORY_REQUEST,ACTIVE_CATEGORY_SUCCESS,ACTIVE_CATEGORY_FAIL,
    DELETE_CATEGORY_REQUEST,DELETE_CATEGORY_SUCCESS,DELETE_CATEGORY_FAIL,
    EDIT_CATEGORY_REQUEST,EDIT_CATEGORY_SUCCESS,EDIT_CATEGORY_FAIL
} from '../constants/categoryConstants'
import api from '../utils/api'
import { Dispatch } from 'redux';

interface CategoryResultItem {
    _id: string;
    name: string;
    status: number;
    slug: string;
    createdAt: string;
    updatedAt: string;
}

interface CategoryResults {
    totalUser: number;
    pageCount: number;
    pageindex: number;
    result: CategoryResultItem[];
}

interface CategoryData {
    success: boolean;
    message: string;
    results: CategoryResults;
}

interface Error {
    response: {
        data: {
            message: string;
        };
    };
    message: string;
}


type ManageCategory = (currentPage: number, limit: number, search: string, setPageCount: (count: number) => void, setPageindex: (index: number) => void) => (dispatch: Dispatch) => Promise<void>;

export const manageCategory: ManageCategory = (currentPage, limit, search, setPageCount, setPageindex) => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_LIST_REQUEST });

        const { data } = await api.get(`/api/v1/categorypagination?page=${currentPage}&limit=${limit}&search=${search}`);
        
        dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data.results });
        setPageCount(data.results.pageCount);
        setPageindex(data.results.pageindex);
    } catch (error: unknown) {
        const err = error as Error;
        dispatch({
            type: CATEGORY_LIST_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        });
    }
};


export const activeCategory = (input: any, toast: { success: (msg: string) => void, error: (msg: string) => void }) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: ACTIVE_CATEGORY_REQUEST });

        const response = await api.post("/api/v1/activecategory", input);
        dispatch({ type: ACTIVE_CATEGORY_SUCCESS, payload: response.data });
        toast.success(response.data.message);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
            dispatch({
                type: ACTIVE_CATEGORY_FAIL,
                payload: error.response.data.message,
            });
        } else {
            toast.error(error.message);
            dispatch({
                type: ACTIVE_CATEGORY_FAIL,
                payload: error.message,
            });
        }
    }
};


export const manageAllCategory = () => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: CATEGORY_LIST_REQUEST });

        const { data } = await api.get('/api/v1/getcategory');
        dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data.category });
    } catch (error: any) {
        const err = error as Error;
        dispatch({
            type: CATEGORY_LIST_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        });

}
};

export const addCategory = (input: any, toast: { success: (msg: string) => void, error: (msg: string) => void }) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: ADD_CATEGORY_REQUEST });

        const response = await api.post("/api/v1/addcategory", input);
        dispatch({ type: ADD_CATEGORY_SUCCESS, payload: response.data });
        toast.success(response.data.message);
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message);
        }
        dispatch({
            type: ADD_CATEGORY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};




export const deleteCategory = (input: any, toast: { success: (msg: string) => void, error: (msg: string) => void }) => async (dispatch: Dispatch) => {
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

export const deleteAllCategory = (input: any, toast: { success: (msg: string) => void, error: (msg: string) => void }) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: DELETE_CATEGORY_REQUEST });

        const response = await api.post("/api/v1/deleteallcategory", input);
        dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: response.data });
        toast.success(response.data.message);
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message);
        }
        dispatch({
            type: DELETE_CATEGORY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const editCategory = (id: string, toast: { success: (msg: string) => void, error: (msg: string) => void }) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: EDIT_CATEGORY_REQUEST });

        const response = await api.post(`/api/v1/editcategory/${id}`);
        dispatch({ type: EDIT_CATEGORY_SUCCESS, payload: response.data });
        toast.success(response.data.message);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message);
        }
        dispatch({
            type: EDIT_CATEGORY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const updateCategory = (input: any, toast: { success: (msg: string) => void, error: (msg: string) => void }) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: UPDATE_CATEGORY_REQUEST });

        const response = await api.post("/api/v1/updatecategory", input);
        dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: response.data });
        toast.success(response.data.message);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message);
        }
        console.log(error.response);
        dispatch({
            type: UPDATE_CATEGORY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const addexcelCategory = (input: any, toast: { success: (msg: string) => void, error: (msg: string) => void }) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: ADD_CATEGORY_REQUEST });

        const response = await api.post("/api/v1/importexcelcategory", input);
        dispatch({ type: ADD_CATEGORY_SUCCESS, payload: response.data });
        toast.success(response.data.message);
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message);
        }
        dispatch({
            type: ADD_CATEGORY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};



