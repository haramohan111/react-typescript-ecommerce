import { Dispatch } from 'redux';
import api from '../utils/api';
import { ADD_SLIDER_FAIL, ADD_SLIDER_REQUEST, ADD_SLIDER_SUCCESS, LIST_SLIDER_FAIL, LIST_SLIDER_REQUEST, LIST_SLIDER_SUCCESS } from '../constants/sliderConstants';
import { ADD_CATEGORY_FAIL, ADD_CATEGORY_SUCCESS } from '../constants/categoryConstants';

interface Error {
    response?: {
        data: {
            message: string;
        };
    };
    message: string;
}


export const addSlider= (input: any, toast: { success: (msg: string) => void, error: (msg: string) => void }) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: ADD_SLIDER_REQUEST });

        const response = await api.post("/api/v1/addslider", input);
        dispatch({ type: ADD_SLIDER_SUCCESS, payload: response.data });
        toast.success(response.data.message);
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message);
        }
        dispatch({
            type: ADD_SLIDER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};
type manageSlider= (currentPage: number, limit: number, search: string, setPageCount: (count: number) => void, setPageindex: (index: number) => void) => (dispatch: Dispatch) => Promise<void>;
export const sliderPagination: manageSlider= (currentPage, limit, search, setPageCount, setPageindex) => async (dispatch) => {
    try {
        dispatch({ type: LIST_SLIDER_REQUEST });

        const { data } = await api.get(`/api/v1/sizepagination?page=${currentPage}&limit=${limit}&search=${search}`);
        
        dispatch({ type: LIST_SLIDER_SUCCESS, payload: data.results });
        setPageCount(data.results.pageCount);
        setPageindex(data.results.pageindex);
    } catch (error: unknown) {
        const err = error as Error;
        dispatch({
            type: LIST_SLIDER_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        });
    }
};

export const manageSlider= () => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: LIST_SLIDER_REQUEST });

        const { data } = await api.get("/api/v1/getslider");
        dispatch({ type: LIST_SLIDER_SUCCESS, payload: data.slider});
    } catch (error) {
        const err = error as Error;
        dispatch({
            type: LIST_SLIDER_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message,
        });
    }
};
