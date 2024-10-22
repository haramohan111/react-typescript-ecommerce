import { ADD_CATEGORY_FAIL, ADD_CATEGORY_REQUEST, ADD_CATEGORY_SUCCESS } from "../constants/categoryConstants";
import { LIST_SUBCATEGORYBYID_FAIL, LIST_SUBCATEGORYBYID_REQUEST, LIST_SUBCATEGORYBYID_SUCCESS, LIST_SUBCATEGORY_FAIL, LIST_SUBCATEGORY_REQUEST, LIST_SUBCATEGORY_SUCCESS } from "../constants/listsubcategoryConstants";

interface Subcategory {
    id: string;
    name: string;
    // Add other properties as needed
}

interface ListSubcategoryState {
    loading: boolean;
    listsubcategory: Subcategory[];
    error?: string;
}

interface AddListCategoryState {
    loading: boolean;
    listCategory?: Subcategory[];
    error?: string;
}

interface Action {
    type: string;
    payload?: any;
}

const initialListSubcategoryState: ListSubcategoryState = {
    loading: false,
    listsubcategory: []
};

const initialAddListCategoryState: AddListCategoryState = {
    loading: false,
    listCategory: []
};

export const listSubcategoryReducer = (state: ListSubcategoryState = initialListSubcategoryState, action: Action): ListSubcategoryState => {
    switch (action.type) {
        case LIST_SUBCATEGORYBYID_REQUEST:
            return { loading: true, listsubcategory: [] };
        case LIST_SUBCATEGORYBYID_SUCCESS:
            return { loading: false, listsubcategory: action.payload };
        case LIST_SUBCATEGORYBYID_FAIL:
            return { loading: false, error: action.payload, listsubcategory: [] };

        case LIST_SUBCATEGORY_REQUEST:
            return { loading: true, listsubcategory: [] };
        case LIST_SUBCATEGORY_SUCCESS:
            return { loading: false, listsubcategory: action.payload };
        case LIST_SUBCATEGORY_FAIL:
            return { loading: false, error: action.payload, listsubcategory: [] };
        default:
            return state;
    }
};

export const addlistSubcategoryReducer = (state: AddListCategoryState = initialAddListCategoryState, action: Action): AddListCategoryState => {
    switch (action.type) {
        case ADD_CATEGORY_REQUEST:
            return { loading: true, listCategory: [] };
        case ADD_CATEGORY_SUCCESS:
            return { loading: false, listCategory: action.payload };
        case ADD_CATEGORY_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
