import { Dispatch } from 'redux';
import api from '../utils/api';
import { LIST_SIZE_FAIL, LIST_SIZE_REQUEST, LIST_SIZE_SUCCESS } from '../constants/sizeConstants';

interface Error {
    response?: {
        data: {
            message: string;
        };
    };
    message: string;
}

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
