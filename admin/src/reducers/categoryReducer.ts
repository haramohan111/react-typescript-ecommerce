import { CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, CATEGORY_LIST_FAIL, ADD_CATEGORY_REQUEST, ADD_CATEGORY_SUCCESS, ADD_CATEGORY_FAIL, EDIT_CATEGORY_REQUEST, EDIT_CATEGORY_SUCCESS, EDIT_CATEGORY_FAIL } from "../constants/categoryConstants";

interface Category {
    id: string;
    name: string;
    // Add other properties as needed
}

interface CategoryState {
    loading: boolean;
    category: Category[];
    error?: string;
}

interface Action {
    type: string;
    payload?: any;
}

const initialCategoryState: CategoryState = {
    loading: false,
    category: []
};

export const categoryListReducer = (state: CategoryState = initialCategoryState, action: Action): CategoryState => {
    switch (action.type) {
        case CATEGORY_LIST_REQUEST:
            return { loading: true, category: [] };
        case CATEGORY_LIST_SUCCESS:
            return { loading: false, category: action.payload };
        case CATEGORY_LIST_FAIL:
            return { loading: false, error: action.payload, category: [] };
        default:
            return state;
    }
};

interface AddCategoryState {
    loading: boolean;
    category?: Category[];
    error?: string;
}

const initialAddCategoryState: AddCategoryState = {
    loading: false,
    category: []
};

export const categoryAddReducer = (state: AddCategoryState = initialAddCategoryState, action: Action): AddCategoryState => {
    switch (action.type) {
        case ADD_CATEGORY_REQUEST:
            return { loading: true, category: [] };
        case ADD_CATEGORY_SUCCESS:
            return { loading: false, category: action.payload };
        case ADD_CATEGORY_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

interface EditCategoryState {
    loading: boolean;
    geteditcategory?: Category[];
    error?: string;
}

const initialEditCategoryState: EditCategoryState = {
    loading: false,
    geteditcategory: []
};

export const categoryEditReducer = (state: EditCategoryState = initialEditCategoryState, action: Action): EditCategoryState => {
    switch (action.type) {
        case EDIT_CATEGORY_REQUEST:
            return { loading: true, geteditcategory: [] };
        case EDIT_CATEGORY_SUCCESS:
            return { loading: false, geteditcategory: action.payload };
        case EDIT_CATEGORY_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
