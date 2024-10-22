import api from "../utils/api"
import axiosBaseURL from "../utils/httpCommon"
import axios from 'axios'
const { ADD_SUBCATEGORY_REQUEST, 
    ADD_SUBCATEGORY_SUCCESS, 
    ADD_SUBCATEGORY_FAIL, 
    SUBCATEGORY_LIST_REQUEST, 
    SUBCATEGORY_LIST_SUCCESS, 
    SUBCATEGORY_LIST_FAIL,
    SUBCATEGORYBYID_LIST_REQUEST,
    SUBCATEGORYBYID_LIST_SUCCESS,
    SUBCATEGORYBYID_LIST_FAIL,DELETE_SUBCATEGORY_REQUEST,DELETE_SUBCATEGORY_SUCCESS,DELETE_SUBCATEGORY_FAIL } = require("../constants/subcategoryConstants")

    import { Dispatch } from 'redux';
    
    export const addSubcategory = (input: any, toast: { success: (msg: string) => void, error: (msg: string) => void }) => async (dispatch: Dispatch) => {
        try {
            dispatch({ type: ADD_SUBCATEGORY_REQUEST });
    
            const response = await api.post("/api/v1/addsubcategory", input);
            toast.success(response.data.message);
            dispatch({ type: ADD_SUBCATEGORY_SUCCESS, payload: response.data });
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
                dispatch({
                    type: ADD_SUBCATEGORY_FAIL,
                    payload: error.response.data.message,
                });
            } else {
                toast.error(error.message);
                dispatch({
                    type: ADD_SUBCATEGORY_FAIL,
                    payload: error.message,
                });
            }
        }
    };
    
    interface Error {
        response?: {
            data: {
                message: string;
            };
        };
        message: string;
    }
    export const manageSubcategory = () => async (dispatch: Dispatch) => {
        try {
            dispatch({ type: SUBCATEGORY_LIST_REQUEST });
    
            const { data } = await api.get("/api/v1/getsubcategory");
            dispatch({ type: SUBCATEGORY_LIST_SUCCESS, payload: data.subcategory });
        } catch (error: any) {
            const err = error as Error;
            dispatch({
                type: SUBCATEGORY_LIST_FAIL,
                payload: err.response && err.response.data.message ? err.response.data.message : err.message,
            });
        }
    };
    

     
    type ManageSubcategoryPagination = (
        currentPage: number,
        limit: number,
        search: string,
        setPageCount: (count: number) => void,
        setPageindex: (index: number) => void
    ) => (dispatch: Dispatch) => Promise<void>;
    
    export const manageSubcategoryPagination: ManageSubcategoryPagination = (currentPage, limit, search, setPageCount, setPageindex) => async (dispatch: Dispatch) => {
        try {
            dispatch({ type: SUBCATEGORY_LIST_REQUEST });
    
            const { data } = await api.get(`/api/v1/subcategorypagination?page=${currentPage}&limit=${limit}&search=${search}`);
            dispatch({ type: SUBCATEGORY_LIST_SUCCESS, payload: data.results });
            setPageCount(data.results.pageCount);
            setPageindex(data.results.pageindex);
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                dispatch({
                    type: SUBCATEGORY_LIST_FAIL,
                    payload: error.response.data.message,
                });
            } else {
                dispatch({
                    type: SUBCATEGORY_LIST_FAIL,
                    payload: error.message,
                });
            }
        }
    };
    

    
    export const getSubcategoryById = (cat_id: string) => async (dispatch: Dispatch) => {
        try {
            dispatch({ type: SUBCATEGORYBYID_LIST_REQUEST });
    
            const { data } = await api.get(`/api/v1/getsubcategorybyid/${cat_id}`);
            dispatch({ type: SUBCATEGORYBYID_LIST_SUCCESS, payload: data });
        } catch (error: any) {
            const err = error as Error;
            dispatch({
                type: SUBCATEGORYBYID_LIST_FAIL,
                payload: err.response && err.response.data.message ? err.response.data.message : err.message,
            });
        }
    };
    

    
    export const deleteAllSubcategory = (input: any, toast: { success: (msg: string) => void, error: (msg: string) => void }) => async (dispatch: Dispatch) => {
        try {
            // dispatch({ type: DELETE_SUBCATEGORY_REQUEST });
            const response = await api.post("/api/v1/deleteallsubcategory", input);
            // dispatch({ type: DELETE_SUBCATEGORY_SUCCESS, payload: response.data });
            toast.success(response.data.message);
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(error.message);
            }
            dispatch({
                type: DELETE_SUBCATEGORY_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        }
    };
    

    
    export const addexcelSubCategory = (input: any, toast: { success: (msg: string) => void, error: (msg: string) => void }) => async (dispatch: Dispatch) => {
        try {
            // dispatch({ type: ADD_CATEGORY_REQUEST });
            const response = await axios.post("/api/v1/importexcelsubcategory", input);
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
    


