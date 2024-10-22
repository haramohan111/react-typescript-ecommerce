import axios from "axios";
import { LIST_BRAND_FAIL, LIST_BRAND_REQUEST, LIST_BRAND_SUCCESS } from "../constants/brandConstants";
import api from "../utils/api";
import { Dispatch } from 'redux';

interface BrandData {
    brand: {
        id: string;
        name: string;
        // Add other properties as needed
    }[];
}

interface Error {
    response: {
        data: {
            message: string;
        };
    };
    message: string;
}


export const manageBrand = () => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: LIST_BRAND_REQUEST });

        const { data } = await api.get("/api/v1/getbrand");
        dispatch({ type: LIST_BRAND_SUCCESS, payload: data.brand });

    } catch (error: any) {
        const err = error as Error;
        dispatch({
            type: LIST_BRAND_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        });
    }
};

