import { CATEGORY_LIST_FAIL, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS } from "../constants/categoryConstants";

interface CategoryState {
  category: any[]; // Adjust 'any[]' to the specific type of your categories
  loading?: boolean;
  error?: string;
}

interface CategoryAction {
  type: string;
  payload?: any; // Adjust 'any' to the specific type of your payload
}

export const categoryReducer = (state: CategoryState = { category: [] }, action: CategoryAction): CategoryState => {
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
