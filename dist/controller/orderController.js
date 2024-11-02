"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderPagination = exports.verifyPayment = exports.createOrder = exports.customerAddress = exports.checkout = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const razorpay_1 = __importDefault(require("razorpay"));
const crypto_1 = __importDefault(require("crypto"));
const orderModel_1 = __importDefault(require("../models/orderModel"));
const customerModel_1 = __importDefault(require("../models/customerModel"));
const cartModel_1 = __importDefault(require("../models/cartModel"));
// exports.createOrder = AsyncHandler(async (req, res) => {
//     var instance = new Razorpay({
//         key_id: process.env.KEY_ID,
//         key_secret: process.env.KEY_SECRET
//     });
//     const options = {
//         amount: req.body.amount * 100,
//         currency: "INR",
//     }
//     instance.orders.create(options, (error, order) => {
//         if (error) {
//             console.log(error)
//             return res.status(500).json({ message: "Something went wrong" })
//         }
//         res.status(200).json({ data: order })
//     })
// })
exports.checkout = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const instance = new razorpay_1.default({
        key_id: process.env.KEY_ID,
        key_secret: process.env.KEY_SECRET
    });
    const options = {
        amount: Number(99 * 100),
        currency: "INR",
    };
    const order = yield instance.orders.create(options);
    res.status(200).json({
        success: true,
        order
    });
}));
exports.customerAddress = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json([{
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "1234567890",
            "address": "123 Main St, Cityville, ST, 12345",
            "county": "India",
            "state": "Odisha",
            "city": "Chicago",
            "zip": "4446767",
        },
        {
            "name": "Jane Smith",
            "email": "jane.smith@example.com",
            "phone": "0987654321",
            "address": "456 Elm St, Cityville, ST, 54321",
            "county": "India",
            "state": "Maharashtra",
            "city": "Chicago",
            "zip": "444535767",
        },
        {
            "name": "Alice Johnson",
            "email": "alice.johnson@example.com",
            "phone": "1122334455",
            "address": "789 Maple St, Cityville, ST, 67890",
            "county": "India",
            "state": "Karnataka",
            "city": "mahisy",
            "zip": "53453",
        }]);
}));
exports.createOrder = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderItems, shippingAddress, taxPrice, shippingPrice, itemsPrice, paymentMethod, postalCode, state, city } = req.body;
    const userIdFromSession = "67138ee0d2499cc5ad4916ce";
    if (!userIdFromSession) {
        res.status(400).json({ message: "Invalid or missing user ID" });
    }
    const customer = yield customerModel_1.default.create(shippingAddress);
    const order = yield orderModel_1.default.create({
        user: userIdFromSession,
        orderItems,
        shippingAddress: customer._id,
        taxPrice,
        shippingPrice,
        totalPrice: itemsPrice,
        payment: paymentMethod,
        postalCode: postalCode,
        city: city,
        country: state
    });
    if (order) {
        const odid = order._id.toString();
        req.session.order_id = odid; // Ensure order_id is properly set as a string
        console.log(order._id);
    }
    res.status(200).json({
        success: true,
        order
    });
}));
exports.verifyPayment = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sorder_id = req.session.order_id;
    const cartSessionId = req.cookies.cart_session_id;
    console.log(sorder_id);
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto_1.default
        .createHmac("sha256", process.env.KEY_SECRET)
        .update(sign.toString())
        .digest("hex");
    if (razorpay_signature === expectedSign) {
        yield orderModel_1.default.findByIdAndUpdate(sorder_id, {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            isPaid: true,
            paidAt: Date.now()
        });
        const carts = yield cartModel_1.default.find({ cart_session_id: cartSessionId });
        if (carts.length > 0) {
            yield cartModel_1.default.updateMany({ cart_session_id: cartSessionId }, { $set: { status: 0 } });
        }
        res.redirect("http://localhost:3000/account/orders");
    }
    else {
        res.status(400).json({ message: "Invalid signature sent!" });
    }
}));
exports.orderPagination = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const search = req.query.search;
    let order;
    if (search) {
        order = yield orderModel_1.default.find({ "name": { "$regex": search, "$options": "i" } })
            .populate({ path: "orderItems", populate: { path: 'product_id' } })
            .sort([['_id', -1]]);
    }
    else {
        order = yield orderModel_1.default.find({})
            .populate({ path: "orderItems", populate: { path: 'product_id' } })
            .sort([['_id', -1]]);
    }
    const page = parseInt(req.query.page, 10);
    const limit = parseInt(req.query.limit, 10);
    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;
    const results = {};
    results.totalOrder = order.length;
    results.pageCount = Math.ceil(order.length / limit);
    if (lastIndex < order.length) {
        results.next = {
            page: page + 1,
        };
    }
    if (startIndex > 0) {
        results.prev = {
            page: page - 1,
        };
    }
    results.pageindex = startIndex;
    results.result = order.slice(startIndex, lastIndex);
    res.status(200).send({
        success: true,
        message: "get all orders",
        results
    });
}));
