import { LIST_COLOR_FAIL, LIST_COLOR_REQUEST, LIST_COLOR_SUCCESS } from "../constants/colorConstants";

interface Color {
    id: string;
    name: string;
    // Add other properties as needed
}

interface ColorState {
    loading: boolean;
    colors: Color[];
    error?: string;
}

interface Action {
    type: string;
    payload?: any;
}

const initialColorState: ColorState = {
    loading: false,
    colors: []
};

export const colorReducer = (state: ColorState = initialColorState, action: Action): ColorState => {
    switch (action.type) {
        case LIST_COLOR_REQUEST:
            return { loading: true, colors: [] };
        case LIST_COLOR_SUCCESS:
            return { loading: false, colors: action.payload };
        case LIST_COLOR_FAIL:
            return { loading: false, error: action.payload, colors: [] };
        default:
            return state;
    }
};
