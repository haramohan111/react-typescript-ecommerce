import { LIST_ORDER_FAIL, LIST_ORDER_REQUEST, LIST_ORDER_SUCCESS } from "../constants/orderConstants"
import api from "../utils/api"

import { Dispatch } from 'redux';


interface Error {
    response?: {
        data: {
            message: string;
        };
    };
    message: string;
}

type ManageOrder = (
    currentPage: number,
    limit: number,
    search: string,
    setPageCount: (count: number) => void,
    setPageindex: (index: number) => void
) => (dispatch: Dispatch) => Promise<void>;

export const manageOrder: ManageOrder = (currentPage, limit, search, setPageCount, setPageindex) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: LIST_ORDER_REQUEST });

        const { data } = await api.get(`/api/v1/orderpagination?page=${currentPage}&limit=${limit}&search=${search}`);
        dispatch({ type: LIST_ORDER_SUCCESS, payload: data.results });
        setPageCount(data.results.pageCount);
        setPageindex(data.results.pageindex);
    } catch (error: any) {
        const err = error as Error;
        dispatch({
            type: LIST_ORDER_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message,
        });
    }
};
