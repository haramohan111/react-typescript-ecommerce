import { Request, Response } from 'express';
import AsyncHandler from "express-async-handler";
import cartModel from "../models/cartModel";
import productModel from "../models/productModel";
import couponModel from "../models/couponModel";
import session from 'express-session';
import mongoose from 'mongoose'

// Interface for Coupon
interface ICoupon {
    _id: mongoose.Types.ObjectId;
    coupon: string;
    coupontype: string;
    value: number;
    description: string;
}
interface IProduct {
    _id: string;
    price: number;
}

interface ICart {
    _id: string;
    product_id: number;
    quantity: number;
    price: number;
    cart_session_id?: string;
}
// exports.testCart = (req,res)=>{
//     const sessionuser = req.session.user;
//     console.log(sessionuser)
//     res.json(sessionuser)
// }

declare module 'express-session' {
    interface SessionData {
      cart_session_id: string;
      userid?: string; // If you have this property
      cart_id?: string; // If you have this property
    }
  }

  export const addtocart = AsyncHandler(async (req: Request, res: Response): Promise<void> => {

    let id:string;

    if(req.session.cart_session_id){
      id = req.session.cart_session_id
    }else{
        let sid:string = "id" + Math.random().toString(16).slice(2)
        req.session.cart_session_id = sid
    }
    // console.log(req.session)
    // console.log(req.session.cart_session_id)
    const pid:number = parseInt(req.params.id);
    const qty:number = parseInt(req.params.qty);
    const products = await productModel.findOne({ _id: pid }) as IProduct;
    //res.json(products.price)
    const prod_id = await cartModel.findOne({ product_id: pid }) as ICart;


    if (prod_id) {
        const quan = Number(prod_id.quantity) + Number(qty);
        const price = Number(products.price) * Number(quan);
        const cartupdate = await cartModel.findByIdAndUpdate(prod_id, { quantity: quan, price }) as ICart | null;

    } else {
        let id;
        let newprice:number = products.price * qty;
        const cartItemData: Partial<ICart> = {
            product_id: pid,
            quantity: qty,
            price: newprice,
        }
        if(typeof req.session.userid == undefined){
            const cartinsert = await cartModel.create({...cartItemData,cart_session_id:id})  ;
        }else{
            const cartinsert = await cartModel.create(cartItemData) ;
        }
    }
    const cart = await cartModel.find({}).populate({ path: 'product_id' });
    req.session.cart_id = cart.map(item => item._id).toString();
    //req.session.cart_id = cart._id
    res.json(cart)
})

export const cartList = AsyncHandler(async (req, res) => {
    let totalprice = await cartModel.aggregate([
        {
            $group: {
                _id: null,
                total: {
                    $sum: "$price"
                }
            }
        }
    ])
    const allcart = await cartModel.find({})
        .populate({ path: 'product_id' })
   const data:any = { allcart, totalprice }
    res.json(data)

    // const products = await productModel.find({})
    //     .populate({ path: 'category_id' })
    //     .populate({ path: 'subcategory_id' })
    //     .populate({ path: 'listsubcategory_id' })
    // res.json(products)
})

export const incQty = AsyncHandler(async (req, res) => {
    const cartid:string = req.params.id
    const cart = await cartModel.findById({ _id: cartid }) as ICart | null;

    if (!cart) {
      res.status(404).json({ success: false, message: "Cart item not found" });
      return;
    }
    const productid = cart.product_id
    const product = await productModel.findById({ _id: productid }) as IProduct | null;
    if (!product) {
        res.status(404).json({ success: false, message: "Product not found" });
        return;
      }
    const price = product.price
    const qty = cart.quantity + Number(1)
    const cartPrice = cart.price + product.price

    const cartinc = await cartModel.findOneAndUpdate({ _id: cartid }, { quantity: qty, price: cartPrice }, { new: true })
    if (cartinc) {
        let totalprice = await cartModel.aggregate([
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$price"
                    }
                }
            }
        ])
        const allcart = await cartModel.find({})
            .populate({ path: 'product_id' })
        const data = { allcart, totalprice }
        res.json(data)
    }

})

export const descQty = AsyncHandler(async (req, res) => {
    const cartid = req.params.id
    const cart = await cartModel.findById({ _id: cartid })
    if (!cart) {
        res.status(404).json({ success: false, message: "Cart item not found" });
        return;
      }
    const productid = cart.product_id
    const product = await productModel.findById({ _id: productid })
    if (!product) {
        res.status(404).json({ success: false, message: "Product not found" });
        return;
      }
    //const price = product.price
    let allcart, data, totalprice

    if (cart.quantity > 1) {
        const qty = cart.quantity - Number(1)
        const cartPrice = cart.price - Number(product.price)
        const cartdesc = await cartModel.findOneAndUpdate({ _id: cartid }, { quantity: qty, price: cartPrice }, { new: true })
        if (cartdesc) {
            totalprice = await cartModel.aggregate([
                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: "$price"
                        }
                    }
                }
            ])
            console.log(cartPrice, "lll")
            allcart = await cartModel.find({})
                .populate({ path: 'product_id' })
           const data = { allcart, totalprice }
            res.json(data)
        }

    } else {
        //   const allprice =  await cartModel.aggregate([
        //     {
        //         $lookup:{from:'products', localField:'products_id',foreignField:'_id',as:'prod'}
        //     },
        // ])
        totalprice = await cartModel.aggregate([
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$price"
                    }
                }
            }
        ])
        allcart = await cartModel.find({})
            .populate({ path: 'product_id' })

        const data = { allcart, totalprice }
        res.json(data)
    }

})

export const deleteCart = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        const id: string = req.params.id;
        const cart = await cartModel.deleteOne({ _id: id });
        
        if (cart) {
            const totalprice = await cartModel.aggregate([
                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: "$price"
                        }
                    }
                }
            ]);

            const allcart = await cartModel.find({}).populate({ path: 'product_id' });
            const data = { allcart, totalprice };

            res.status(200).json(data);
        }
    } catch (e) {
        res.status(500).json({
            success: false,
            error: e,
            message: "Something went wrong"
        });
    }
});

export const couponCode = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        const cp: string = req.params.coupon;
        const getcoupon = await couponModel.findOne({ coupon: cp }) as ICoupon | null;

        if (!getcoupon) {
            res.status(404).json({ success: false, message: "Coupon not found" });
            return;
        }

        const totalprice = await cartModel.aggregate([
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$price"
                    }
                }
            }
        ]);

        const newprice = totalprice.map(tp => ({ newprice: tp.total }));
        let discountvalue: number;
        let discountprice: number;
        let desc: string = getcoupon.description;

        if (getcoupon.coupontype === "flat") {
            discountvalue = getcoupon.value;
            discountprice = Number(newprice[0].newprice) - discountvalue;
        } else if (getcoupon.coupontype === "percentage") {
            discountvalue = getcoupon.value;
            const percentagecalc = (discountvalue * Number(newprice[0].newprice)) / 100;
            discountprice = Number(newprice[0].newprice) - percentagecalc;
        } else {
            res.status(400).json({ success: false, message: "Invalid coupon type" });
            return;
        }

        const allcart = await cartModel.find({}).populate({ path: 'product_id' });
        const data = { allcart, totalprice, discountprice, discountvalue, desc };
        res.status(200).json(data);

    } catch (e) {
        res.status(400).json({
            success: false,
            error: e,
            message: "Something went wrong"
        });
    }
});