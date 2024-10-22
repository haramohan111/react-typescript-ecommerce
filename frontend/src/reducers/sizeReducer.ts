import { LIST_SIZE_FAIL, LIST_SIZE_REQUEST, LIST_SIZE_SUCCESS } from "../constants/sizeConstants";

interface SizeState {
  sizes: any[]; // Adjust 'any[]' to the specific type of your sizes
  loading?: boolean;
  error?: string;
}

interface SizeAction {
  type: string;
  payload?: any; // Adjust 'any' to the specific type of your payload
}

export const sizeReducer = (state: SizeState = { sizes: [] }, action: SizeAction): SizeState => {
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
