import { Dispatch } from 'redux';
import api from '../utils/api';
import { ADD_SELLER_FAIL, ADD_SELLER_REQUEST, ADD_SELLER_SUCCESS, LIST_SELER_FAIL, LIST_SELER_REQUEST, LIST_SELER_SUCCESS } from '../constants/sellerConstants';


interface Error {
    response?: {
        data: {
            message: string;
        };
    };
    message: string
}
export const manageSeller = () => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: LIST_SELER_REQUEST });

        const { data } = await api.get("/api/v1/getseller");
        dispatch({ type: LIST_SELER_SUCCESS, payload: data.seller });
    } catch (error: any) {
        const err = error as Error;
        dispatch({
            type: LIST_SELER_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message,
        });
    }
};

export const addSeler = (input: any, toast: { success: (msg: string) => void, error: (msg: string) => void }) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: ADD_SELLER_REQUEST });

        const response = await api.post("/api/v1/addseler", input);
        dispatch({ type: ADD_SELLER_SUCCESS, payload: response.data });
        toast.success(response.data.message);
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message);
        }
        dispatch({
            type: ADD_SELLER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};
type manageSeler = (currentPage: number, limit: number, search: string, setPageCount: (count: number) => void, setPageindex: (index: number) => void) => (dispatch: Dispatch) => Promise<void>;
export const selerPagination: manageSeler = (currentPage, limit, search, setPageCount, setPageindex) => async (dispatch) => {
    try {
        dispatch({ type: LIST_SELER_REQUEST });

        const { data } = await api.get(`/api/v1/sellerpagination?page=${currentPage}&limit=${limit}&search=${search}`);
        
        dispatch({ type: LIST_SELER_SUCCESS, payload: data.results });
        setPageCount(data.results.pageCount);
        setPageindex(data.results.pageindex);
    } catch (error: unknown) {
        const err = error as Error;
        dispatch({
            type: LIST_SELER_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        });
    }
};
