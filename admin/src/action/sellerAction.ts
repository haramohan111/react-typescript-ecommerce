import { Dispatch } from 'redux';
import api from '../utils/api';
import { LIST_SELER_FAIL, LIST_SELER_REQUEST, LIST_SELER_SUCCESS } from '../constants/sellerConstants';


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
