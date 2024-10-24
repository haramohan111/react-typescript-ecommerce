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
type manageSize = (currentPage: number, limit: number, search: string, setPageCount: (count: number) => void, setPageindex: (index: number) => void) => (dispatch: Dispatch) => Promise<void>;
export const sizePagination: manageSize = (currentPage, limit, search, setPageCount, setPageindex) => async (dispatch) => {
    try {
        dispatch({ type: LIST_SIZE_REQUEST });

        const { data } = await api.get(`/api/v1/sizepagination?page=${currentPage}&limit=${limit}&search=${search}`);
        
        dispatch({ type: LIST_SIZE_SUCCESS, payload: data.results });
        setPageCount(data.results.pageCount);
        setPageindex(data.results.pageindex);
    } catch (error: unknown) {
        const err = error as Error;
        dispatch({
            type: LIST_SIZE_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        });
    }
};

export const manageSize = () => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: LIST_SIZE_REQUEST });

        const { data } = await api.get("/api/v1/getsize");
        dispatch({ type: LIST_SIZE_SUCCESS, payload: data.size });
    } catch (error) {
        const err = error as Error;
        dispatch({
            type: LIST_SIZE_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message,
        });
    }
};
