import { LIST_BRAND_FAIL, LIST_BRAND_REQUEST, LIST_BRAND_SUCCESS } from "../constants/brandConstants";

interface BrandState {
  brands: any[]; // Adjust the type according to your actual data structure
  loading?: boolean;
  error?: string;
}

interface BrandAction {
  type: string;
  payload?: any; // Adjust the type according to your actual data structure
}

export const brandReducer = (state: BrandState = { brands: [] }, action: BrandAction): BrandState => {
  switch (action.type) {
    case LIST_BRAND_REQUEST:
      return { loading: true, brands: [] };
    case LIST_BRAND_SUCCESS:
      return { loading: false, brands: action.payload };
    case LIST_BRAND_FAIL:
      return { loading: false, error: action.payload, brands: [] }; // Ensure 'brands' is always present
    default:
      return state;
  }
};
