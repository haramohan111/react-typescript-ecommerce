import { Dispatch } from 'redux';
import api from '../utils/api';
import { LIST_COLOR_FAIL, LIST_COLOR_REQUEST, LIST_COLOR_SUCCESS } from '../constants/colorConstants';


interface Error {
    response?: {
        data: {
            message: string;
        };
    };
    message: string;
}
export const manageColor = () => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: LIST_COLOR_REQUEST });

        const { data } = await api.get("/api/v1/getcolor");
        dispatch({ type: LIST_COLOR_SUCCESS, payload: data.color });
    } catch (error: any) {
        const err = error as Error;
        dispatch({
            type: LIST_COLOR_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        });
    }
};
