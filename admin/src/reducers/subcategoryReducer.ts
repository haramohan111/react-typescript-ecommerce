import { ADD_SUBCATEGORY_REQUEST, ADD_SUBCATEGORY_SUCCESS, ADD_SUBCATEGORY_FAIL, SUBCATEGORY_LIST_FAIL, SUBCATEGORY_LIST_REQUEST, SUBCATEGORY_LIST_SUCCESS, SUBCATEGORYBYID_LIST_REQUEST, SUBCATEGORYBYID_LIST_SUCCESS, SUBCATEGORYBYID_LIST_FAIL } from "../constants/subcategoryConstants";

interface Subcategory {
    id: string;
    name: string;
    // Add other properties as needed
}

interface AddSubcategoryState {
    loading: boolean;
    subcategory?: Subcategory[];
    error?: string;
}

interface SubcategoryState {
    loading: boolean;
    subcategory: Subcategory[];
    subcategorybyid: Subcategory[];
    error?: string;
}

interface Action {
    type: string;
    payload?: any;
}

const initialAddSubcategoryState: AddSubcategoryState = {
    loading: false,
    subcategory: []
};

const initialSubcategoryState: SubcategoryState = {
    loading: false,
    subcategory: [],
    subcategorybyid: []
};

export const addSubcategoryReducer = (state: AddSubcategoryState = initialAddSubcategoryState, action: Action): AddSubcategoryState => {
    switch (action.type) {
        case ADD_SUBCATEGORY_REQUEST:
            return { loading: true, subcategory: [] };
        case ADD_SUBCATEGORY_SUCCESS:
            return { loading: false, subcategory: action.payload };
        case ADD_SUBCATEGORY_FAIL:
            return { loading: false, error: action.payload, subcategory: [] };
        default:
            return state;
    }
};

export const SubcategoryReducer = (state: SubcategoryState = initialSubcategoryState, action: Action): SubcategoryState => {
    switch (action.type) {
        case SUBCATEGORY_LIST_REQUEST:
            return { loading: true, subcategory: [], subcategorybyid: state.subcategorybyid };
        case SUBCATEGORY_LIST_SUCCESS:
            return { loading: false, subcategory: action.payload, subcategorybyid: state.subcategorybyid };
        case SUBCATEGORY_LIST_FAIL:
            return { loading: false, error: action.payload, subcategory: [], subcategorybyid: state.subcategorybyid };
        case SUBCATEGORYBYID_LIST_REQUEST:
            return { loading: true, subcategory: state.subcategory, subcategorybyid: [] };
        case SUBCATEGORYBYID_LIST_SUCCESS:
            return { loading: false, subcategory: state.subcategory, subcategorybyid: action.payload };
        case SUBCATEGORYBYID_LIST_FAIL:
            return { loading: false, error: action.payload, subcategory: state.subcategory, subcategorybyid: [] };
        default:
            return state;
    }
};
