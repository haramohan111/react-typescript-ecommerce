import { Request, Response } from 'express';
import slug from "slug";
import asyncHandler from 'express-async-handler';
import subcategoryModel from "../models/subcategoryModel";
import { ObjectId } from 'mongodb';
import categoryModel from "../models/categoryModel";
import { normalizeNotes } from "razorpay/dist/utils/razorpay-utils";
import mongoose from 'mongoose';

// Interface for Subcategory
interface ISubcategory {
    categoryid: string;
    subcatename: string;
    status: string;
}

export const addSubcategory = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { categoryid, subcatename, status } = req.body as ISubcategory;

    console.log(req.body);

    const subcategoryStatus = status === "Active" ? 1 : 0;

    const subcategory = await subcategoryModel.create({
        category_id: categoryid,
        name: subcatename,
        slug: slug(subcatename),
        status: subcategoryStatus
    });

     res.status(200).send({
        success: true,
        message: "subcategory added successfully",
        subcategory
    });
});

export const getSubcategory = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const subcategory = await subcategoryModel.find({});

    res.status(200).send({
        success: true,
        message: "get all subcategory",
        subcategory
    });
});


export const subcategoryPagination = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const search: string = req.query.search as string;
    let subcategory;

    if (search) {
        subcategory = await subcategoryModel.find({ "name": { "$regex": search, "$options": "i" } })
            .populate({ path: 'category_id' })
            .sort([['_id', -1]]);
    } else {
        subcategory = await subcategoryModel.find({})
            .populate({ path: 'category_id' })
            .sort([['_id', -1]]);
    }

    const page: number = parseInt(req.query.page as string);
    const limit: number = parseInt(req.query.limit as string);

    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;

    const results: any = {};
    results.totalUser = subcategory.length;
    results.pageCount = Math.ceil(subcategory.length / limit);

    if (lastIndex < subcategory.length) {
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
    results.result = subcategory.slice(startIndex, lastIndex);

     res.status(200).send({
        success: true,
        message: "get all subcategory",
        results
    });
});

export const getSubcategorybyid = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    console.log(id);
    if (id !== null) {
        const subcategory = await subcategoryModel.find({ category_id: id });
        res.json(subcategory);
    } else {
        res.status(400).send({
            success: false,
            message: "Invalid category ID"
        });
    }
});

export const deleteallSubcategory = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        console.log(req.body);
        const validIds: mongoose.Types.ObjectId[] = [];
        const invalidIds: string[] = [];

        for (const id of req.body) {
            if (mongoose.Types.ObjectId.isValid(id)) {
                const document = await subcategoryModel.findOne({ _id: new mongoose.Types.ObjectId(id) });
                if (document) {
                    validIds.push(new mongoose.Types.ObjectId(id));
                } else {
                    invalidIds.push(id);
                }
            } else {
                invalidIds.push(id);
            }
        }

        if (invalidIds.length === 0) {
            const result = await subcategoryModel.deleteMany({ _id: { $in: validIds } });
            if (result.deletedCount !== 0) {
                res.status(200).send({
                    success: true,
                    message: "Subcategory deleted successfully",
                    result
                });
            } else {
                 res.status(400).send({
                    success: false,
                    message: "Subcategory deletion failed"
                });
            }
        } else {
             res.status(400).send({
                success: false,
                message: "SubcategoryId is invalid",
            });
        }
    } catch (e: any) {
        res.status(400).send({
            success: false,
            message: "Something went wrong",
            error: e.message
        });
    }
});


interface ISubcategoryItem {
    category_id: string;
    subcategory: string;
}

export const addexcelSubCategory = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        const items: ISubcategoryItem[] = req.body;

        const itemsWithSlugs = await Promise.all(items.map(async (item) => ({
            ...item,
            category_id: (await categoryModel.findOne({ name: item.category_id }).select('_id'))?._id,
            name: item.subcategory,
            slug: slug(item.subcategory, { lower: true })
        })));

        await subcategoryModel.insertMany(itemsWithSlugs, { ordered: false, rawResult: true })
            .then((result) => {
                console.log('Raw result:', result);
                res.status(200).send({
                    success: true,
                    message: "Subcategories added successfully",
                    category: result
                });
            })
            .catch((err) => {
                console.error('Error inserting documents:', err);
                res.status(400).send({
                    success: false,
                    message: err.message
                });
            });

    } catch (e: any) {
        res.status(400).send({
            success: false,
            message: "Something went wrong",
            error: e.message
        });
    }
});
