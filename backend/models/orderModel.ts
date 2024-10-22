import mongoose, { Schema, Document } from 'mongoose';

// Interface for OrderItems
interface IOrderItem extends Document {
  name: string;
  qty: number;
  image: string;
  price: number;
  product_id: mongoose.Types.ObjectId;
}

// Interface for ShippingAddress
interface IShippingAddress extends Document {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

// Interface for PaymentResults
interface IPaymentResults extends Document {
  id: string;
  status: string;
  update_time: string;
  email_address: string;
}

// Interface for Order
interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  orderItems: IOrderItem[];
  shippingAddress: IShippingAddress;
  payment: string;
  paymentResults: IPaymentResults;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt: Date;
  isDelevired: boolean;
  DeleviredAt: Date;
  amount: number;
  currency: string;
  receipt: string;
}

// Order schema
const orderSchema: Schema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      qty: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  shippingAddress: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  payment: {
    type: String,
    required: true,
  },
  paymentResults: {
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String },
  },
  taxPrice: {
    type: Number,
    default: 0.0,
  },
  shippingPrice: {
    type: Number,
    default: 0.0,
  },
  totalPrice: {
    type: Number,
    default: 0.0,
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },
  paidAt: {
    type: Date,
  },
  isDelevired: {
    type: Boolean,
    default: false,
  },
  DeleviredAt: {
    type: Date,
  },
  amount: {
    type: Number,
  },
  currency: {
    type: String,
  },
  receipt: {
    type: String,
  },
}, { timestamps: true });

const Order = mongoose.model<IOrder>('Order', orderSchema);

export default Order;
