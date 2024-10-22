import { Request, Response } from 'express';
import session from 'express-session';
import AsyncHandler from "express-async-handler";
import Razorpay from 'razorpay';
import crypto from "crypto";
import orderModel from "../models/orderModel";
import mongoose from 'mongoose';

declare module 'express-session' {
    interface SessionData {
        order_id: string; // Add custom properties here
    }
}
interface IOrder {
    orderItems: any[];
    shippingAddress: any;
    taxPrice: number;
    shippingPrice: number;
    itemsPrice: number;
}

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

export const checkout = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const instance = new Razorpay({
        key_id: process.env.KEY_ID as string,
        key_secret: process.env.KEY_SECRET as string
    });

    const options: { amount: number; currency: string } = {
        amount: Number(99 * 100),
        currency: "INR",
    };
    const order = await instance.orders.create(options);
    
    res.status(200).json({
        success: true,
        order
    });
});

export const verifyPayment = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    console.log(req.body);
    const sorder_id:string = req.session.order_id as string;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body as { 
        razorpay_order_id: string; 
        razorpay_payment_id: string; 
        razorpay_signature: string;
    };

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
        .createHmac("sha256", process.env.KEY_SECRET as string)
        .update(sign.toString())
        .digest("hex");

    if (razorpay_signature === expectedSign) {
        await orderModel.findByIdAndUpdate(sorder_id, { 
            razorpay_order_id, 
            razorpay_payment_id, 
            razorpay_signature, 
            isPaid: true, 
            paidAt: Date.now()
        });

        res.redirect("http://localhost:3000/account/orders");
    } else {
        res.status(400).json({ message: "Invalid signature sent!" });
    }
});

export const createOrder = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { orderItems, shippingAddress, taxPrice, shippingPrice, itemsPrice } = req.body as IOrder;
    
    const order = await orderModel.create({
        user_id: new mongoose.Types.ObjectId("23jh23g2"), 
        orderItems, 
        shippingAddress,
        taxPrice, 
        shippingPrice, 
        totalPrice: itemsPrice
    });
    // if(order){
    //     req.session.order_id = order._id.toString(); // Ensure order_id is properly set as a string
    // }


    res.status(200).json({
        success: true,
        order
    });
});


export const orderPagination = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const search: string = req.query.search as string;
    let order;

    if (search) {
        order = await orderModel.find({ "name": { "$regex": search, "$options": "i" } })
            .populate({ path: "orderItems", populate: { path: 'product_id' } })
            .sort([['_id', -1]]);
    } else {
        order = await orderModel.find({})
            .populate({ path: "orderItems", populate: { path: 'product_id' } })
            .sort([['_id', -1]]);
    }

    const page: number = parseInt(req.query.page as string, 10);
    const limit: number = parseInt(req.query.limit as string, 10);

    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;

    const results: any = {};
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
});