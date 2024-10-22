import { LIST_COLOR_FAIL, LIST_COLOR_REQUEST, LIST_COLOR_SUCCESS } from "../constants/colorConstants";

interface ColorState {
  colors: any[]; // Adjust 'any[]' to the specific type of your color items
  loading?: boolean;
  error?: string;
}

interface ColorAction {
  type: string;
  payload?: any; // Adjust 'any' to the specific type of your payload
}

export const colorReducer = (state: ColorState = { colors: [] }, action: ColorAction): ColorState => {
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
