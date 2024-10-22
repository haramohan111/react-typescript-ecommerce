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
exports.couponCode = exports.deleteCart = exports.descQty = exports.incQty = exports.cartList = exports.addtocart = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const cartModel_1 = __importDefault(require("../models/cartModel"));
const productModel_1 = __importDefault(require("../models/productModel"));
const couponModel_1 = __importDefault(require("../models/couponModel"));
exports.addtocart = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id;
    if (req.session.cart_session_id) {
        id = req.session.cart_session_id;
    }
    else {
        let sid = "id" + Math.random().toString(16).slice(2);
        req.session.cart_session_id = sid;
    }
    // console.log(req.session)
    // console.log(req.session.cart_session_id)
    const pid = parseInt(req.params.id);
    const qty = parseInt(req.params.qty);
    const products = yield productModel_1.default.findOne({ _id: pid });
    //res.json(products.price)
    const prod_id = yield cartModel_1.default.findOne({ product_id: pid });
    if (prod_id) {
        const quan = Number(prod_id.quantity) + Number(qty);
        const price = Number(products.price) * Number(quan);
        const cartupdate = yield cartModel_1.default.findByIdAndUpdate(prod_id, { quantity: quan, price });
    }
    else {
        let id;
        let newprice = products.price * qty;
        const cartItemData = {
            product_id: pid,
            quantity: qty,
            price: newprice,
        };
        if (typeof req.session.userid == undefined) {
            const cartinsert = yield cartModel_1.default.create(Object.assign(Object.assign({}, cartItemData), { cart_session_id: id }));
        }
        else {
            const cartinsert = yield cartModel_1.default.create(cartItemData);
        }
    }
    const cart = yield cartModel_1.default.find({}).populate({ path: 'product_id' });
    req.session.cart_id = cart.map(item => item._id).toString();
    //req.session.cart_id = cart._id
    res.json(cart);
}));
exports.cartList = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let totalprice = yield cartModel_1.default.aggregate([
        {
            $group: {
                _id: null,
                total: {
                    $sum: "$price"
                }
            }
        }
    ]);
    const allcart = yield cartModel_1.default.find({})
        .populate({ path: 'product_id' });
    const data = { allcart, totalprice };
    res.json(data);
    // const products = await productModel.find({})
    //     .populate({ path: 'category_id' })
    //     .populate({ path: 'subcategory_id' })
    //     .populate({ path: 'listsubcategory_id' })
    // res.json(products)
}));
exports.incQty = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cartid = req.params.id;
    const cart = yield cartModel_1.default.findById({ _id: cartid });
    if (!cart) {
        res.status(404).json({ success: false, message: "Cart item not found" });
        return;
    }
    const productid = cart.product_id;
    const product = yield productModel_1.default.findById({ _id: productid });
    if (!product) {
        res.status(404).json({ success: false, message: "Product not found" });
        return;
    }
    const price = product.price;
    const qty = cart.quantity + Number(1);
    const cartPrice = cart.price + product.price;
    const cartinc = yield cartModel_1.default.findOneAndUpdate({ _id: cartid }, { quantity: qty, price: cartPrice }, { new: true });
    if (cartinc) {
        let totalprice = yield cartModel_1.default.aggregate([
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$price"
                    }
                }
            }
        ]);
        const allcart = yield cartModel_1.default.find({})
            .populate({ path: 'product_id' });
        const data = { allcart, totalprice };
        res.json(data);
    }
}));
exports.descQty = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cartid = req.params.id;
    const cart = yield cartModel_1.default.findById({ _id: cartid });
    if (!cart) {
        res.status(404).json({ success: false, message: "Cart item not found" });
        return;
    }
    const productid = cart.product_id;
    const product = yield productModel_1.default.findById({ _id: productid });
    if (!product) {
        res.status(404).json({ success: false, message: "Product not found" });
        return;
    }
    //const price = product.price
    let allcart, data, totalprice;
    if (cart.quantity > 1) {
        const qty = cart.quantity - Number(1);
        const cartPrice = cart.price - Number(product.price);
        const cartdesc = yield cartModel_1.default.findOneAndUpdate({ _id: cartid }, { quantity: qty, price: cartPrice }, { new: true });
        if (cartdesc) {
            totalprice = yield cartModel_1.default.aggregate([
                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: "$price"
                        }
                    }
                }
            ]);
            console.log(cartPrice, "lll");
            allcart = yield cartModel_1.default.find({})
                .populate({ path: 'product_id' });
            const data = { allcart, totalprice };
            res.json(data);
        }
    }
    else {
        //   const allprice =  await cartModel.aggregate([
        //     {
        //         $lookup:{from:'products', localField:'products_id',foreignField:'_id',as:'prod'}
        //     },
        // ])
        totalprice = yield cartModel_1.default.aggregate([
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$price"
                    }
                }
            }
        ]);
        allcart = yield cartModel_1.default.find({})
            .populate({ path: 'product_id' });
        const data = { allcart, totalprice };
        res.json(data);
    }
}));
exports.deleteCart = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const cart = yield cartModel_1.default.deleteOne({ _id: id });
        if (cart) {
            const totalprice = yield cartModel_1.default.aggregate([
                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: "$price"
                        }
                    }
                }
            ]);
            const allcart = yield cartModel_1.default.find({}).populate({ path: 'product_id' });
            const data = { allcart, totalprice };
            res.status(200).json(data);
        }
    }
    catch (e) {
        res.status(500).json({
            success: false,
            error: e,
            message: "Something went wrong"
        });
    }
}));
exports.couponCode = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cp = req.params.coupon;
        const getcoupon = yield couponModel_1.default.findOne({ coupon: cp });
        if (!getcoupon) {
            res.status(404).json({ success: false, message: "Coupon not found" });
            return;
        }
        const totalprice = yield cartModel_1.default.aggregate([
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
        let discountvalue;
        let discountprice;
        let desc = getcoupon.description;
        if (getcoupon.coupontype === "flat") {
            discountvalue = getcoupon.value;
            discountprice = Number(newprice[0].newprice) - discountvalue;
        }
        else if (getcoupon.coupontype === "percentage") {
            discountvalue = getcoupon.value;
            const percentagecalc = (discountvalue * Number(newprice[0].newprice)) / 100;
            discountprice = Number(newprice[0].newprice) - percentagecalc;
        }
        else {
            res.status(400).json({ success: false, message: "Invalid coupon type" });
            return;
        }
        const allcart = yield cartModel_1.default.find({}).populate({ path: 'product_id' });
        const data = { allcart, totalprice, discountprice, discountvalue, desc };
        res.status(200).json(data);
    }
    catch (e) {
        res.status(400).json({
            success: false,
            error: e,
            message: "Something went wrong"
        });
    }
}));
