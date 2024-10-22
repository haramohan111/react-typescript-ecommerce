import { LIST_SIZE_FAIL, LIST_SIZE_REQUEST, LIST_SIZE_SUCCESS } from "../constants/sizeConstants";

interface Size {
    id: string;
    name: string;
    // Add other properties as needed
}

interface SizeState {
    loading: boolean;
    sizes: Size[];
    error?: string;
}

interface Action {
    type: string;
    payload?: any;
}

const initialSizeState: SizeState = {
    loading: false,
    sizes: []
};

export const sizeReducer = (state: SizeState = initialSizeState, action: Action): SizeState => {
    switch (action.type) {
        case LIST_SIZE_REQUEST:
            return { loading: true, sizes: [] };
        case LIST_SIZE_SUCCESS:
            return { loading: false, sizes: action.payload };
        case LIST_SIZE_FAIL:
            return { loading: false, error: action.payload, sizes: [] };
        default:
            return state;
    }
};
