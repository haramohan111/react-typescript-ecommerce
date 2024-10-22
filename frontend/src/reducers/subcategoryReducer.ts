import { SUBCATEGORY_LIST_FAIL, SUBCATEGORY_LIST_REQUEST, SUBCATEGORY_LIST_SUCCESS } from "../constants/categoryConstants";

interface SubcategoryState {
  subcategory: any[]; // Adjust 'any[]' to the specific type of your subcategories
  loading?: boolean;
  error?: string;
}

interface SubcategoryAction {
  type: string;
  payload?: any; // Adjust 'any' to the specific type of your payload
}

export const subcategoryReducer = (state: SubcategoryState = { subcategory: [] }, action: SubcategoryAction): SubcategoryState => {
  switch (action.type) {
    case SUBCATEGORY_LIST_REQUEST:
      return { loading: true, subcategory: [] };
    case SUBCATEGORY_LIST_SUCCESS:
      return { loading: false, subcategory: action.payload };
    case SUBCATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload, subcategory: [] };
    default:
      return state;
  }
};
