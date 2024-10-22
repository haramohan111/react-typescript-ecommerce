import { Request, Response } from 'express';
import productModel from "../models/productModel";
import asyncHandler from "express-async-handler";
import fs from "fs";
import mongoose from 'mongoose';


// Interface for Product
interface IProduct {
    category_id: mongoose.Types.ObjectId;
    subcategory_id: mongoose.Types.ObjectId;
    listsubcategory_id: mongoose.Types.ObjectId;
    name: string;
    price: number;
    countInStock: number;
    brand: string;
    size: string;
    color: string;
    seller: string;
    tags: string;
    image: string;
    description: string;
    status: number;
    stock:number;
}

export const addProducts = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    console.log(req.body, 8);

    const { category_id, subcategory_id, listsubcategory_id, productname, price,
        stock, brand, size, color, seller, tags, description, status } = req.body as Omit<IProduct, 'user' | 'image' | 'countInStock' | 'name'> & { productname: string, status: string };
        
            if (!req.file) {
              res.status(400).json({ message: "File upload is required." });
              return;
            }   
    const imgname = req.file.filename;
    
    const products = new productModel({
        user: new mongoose.Types.ObjectId("64b4e9326455b8ecdfa6d4ab"),
        category_id: new mongoose.Types.ObjectId(category_id),
        subcategory_id: new mongoose.Types.ObjectId(subcategory_id),
        listsubcategory_id: new mongoose.Types.ObjectId(listsubcategory_id),
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

    await products.save()
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

});


export const getProductsById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const product = await productModel.findById(req.params.id as string);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json('Product Not Found');
    }
});

export const getallProducts = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const products = await productModel.find({});
    res.json(products);
});

export const manageProducts = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const products = await productModel.find({})
        .populate({ path: 'category_id' })
        .populate({ path: 'subcategory_id' })
        .populate({ path: 'listsubcategory_id' });
    
    res.json(products);
});

export const manageProductsPagination = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const search: string = req.query.search as string;
    let products;

    if (search) {
        products = await productModel.find({ "name": { "$regex": search, "$options": "i" } })
            .populate({ path: 'category_id' })
            .populate({ path: 'subcategory_id' })
            .populate({ path: 'listsubcategory_id' });
    } else {
        products = await productModel.find({})
            .populate({ path: 'category_id' })
            .populate({ path: 'subcategory_id' })
            .populate({ path: 'listsubcategory_id' })
            .sort([['_id', -1]]);
    }

    const page: number = parseInt(req.query.page as string);
    const limit: number = parseInt(req.query.limit as string);

    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;

    const results: any = {};
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
});
