import { ADD_SLIDER_FAIL, ADD_SLIDER_REQUEST, ADD_SLIDER_SUCCESS, LIST_SLIDER_FAIL, LIST_SLIDER_REQUEST, LIST_SLIDER_SUCCESS } from "../constants/sliderConstants";

interface Slider {
    id: string;
    name: string;
    // Add other properties as needed
}

interface sliderstate {
    loading: boolean;
    sliders: Slider[];
    error?: string;
}

interface Action {
    type: string;
    payload?: any;
}

const initialsliderstate: sliderstate = {
    loading: false,
    sliders: []
};

export const sliderReducer = (state: sliderstate = initialsliderstate, action: Action): sliderstate => {
    switch (action.type) {
        case LIST_SLIDER_REQUEST:
            return { loading: true, sliders: [] };
        case LIST_SLIDER_SUCCESS:
            return { loading: false, sliders: action.payload };
        case LIST_SLIDER_FAIL:
            return { loading: false, error: action.payload, sliders: [] };
            case ADD_SLIDER_REQUEST:
                return { loading: true, sliders: [] };
            case ADD_SLIDER_SUCCESS:
                return { loading: false, sliders: action.payload };
            case ADD_SLIDER_FAIL:
                return { loading: false, error: action.payload, sliders: [] };
        default:
            return state;
    }
};
