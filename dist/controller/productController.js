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
exports.manageProductsPagination = exports.manageProducts = exports.getallProducts = exports.getProductsById = exports.addProducts = void 0;
const productModel_1 = __importDefault(require("../models/productModel"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.addProducts = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body, 8);
    const { category_id, subcategory_id, listsubcategory_id, productname, price, stock, brand, size, color, seller, tags, description, status } = req.body;
    if (!req.file) {
        res.status(400).json({ message: "File upload is required." });
        return;
    }
    const imgname = req.file.filename;
    const products = new productModel_1.default({
        user: new mongoose_1.default.Types.ObjectId("64b4e9326455b8ecdfa6d4ab"),
        category_id: new mongoose_1.default.Types.ObjectId(category_id),
        subcategory_id: new mongoose_1.default.Types.ObjectId(subcategory_id),
        listsubcategory_id: new mongoose_1.default.Types.ObjectId(listsubcategory_id),
        name: productname,
        price,
        countInStock: stock,
        brand,
        size,
        color,
        seller,
        tags,
        image: imgname,
        description,
        status: status === "Active" ? 1 : 0
    });
    yield products.save()
        .then((response) => {
        res.status(200).send({
            success: true,
            message: "Add products successfully",
            products,
        });
    }).catch((e) => {
        res.status(500).send({
            success: false,
            message: "Error in add Product",
            error: e.message,
        });
    });
}));
exports.getProductsById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield productModel_1.default.findById(req.params.id);
    if (product) {
        res.json(product);
    }
    else {
        res.status(404).json('Product Not Found');
    }
}));
exports.getallProducts = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield productModel_1.default.find({});
    res.json(products);
}));
exports.manageProducts = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield productModel_1.default.find({})
        .populate({ path: 'category_id' })
        .populate({ path: 'subcategory_id' })
        .populate({ path: 'listsubcategory_id' });
    res.json(products);
}));
exports.manageProductsPagination = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const search = req.query.search;
    let products;
    if (search) {
        products = yield productModel_1.default.find({ "name": { "$regex": search, "$options": "i" } })
            .populate({ path: 'category_id' })
            .populate({ path: 'subcategory_id' })
            .populate({ path: 'listsubcategory_id' });
    }
    else {
        products = yield productModel_1.default.find({})
            .populate({ path: 'category_id' })
            .populate({ path: 'subcategory_id' })
            .populate({ path: 'listsubcategory_id' })
            .sort([['_id', -1]]);
    }
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;
    const results = {};
    results.totalUser = products.length;
    results.pageCount = Math.ceil(products.length / limit);
    if (lastIndex < products.length) {
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
    results.result = products.slice(startIndex, lastIndex);
    res.status(200).send({
        success: true,
        message: "get all products",
        results
    });
}));
