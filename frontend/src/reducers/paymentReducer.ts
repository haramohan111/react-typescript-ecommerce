import { PAYMENT_FAIL, PAYMENT_REQUEST, PAYMENT_SUCCESS } from "../constants/paymentConstants";

interface PaymentState {
  payment: any[]; // Adjust 'any[]' to the specific type of your payment data
  loading?: boolean;
  error?: string;
}

interface PaymentAction {
  type: string;
  payload?: any; // Adjust 'any' to the specific type of your payload
}

export const PaymentReducer = (state: PaymentState = { payment: [] }, action: PaymentAction): PaymentState => {
  switch (action.type) {
    case PAYMENT_REQUEST:
      return { loading: true, payment: [] };
    case PAYMENT_SUCCESS:
      return { loading: false, payment: action.payload };
    case PAYMENT_FAIL:
      return { loading: false, error: action.payload, payment: [] };
    default:
      return state;
  }
};
