import { Request, Response } from 'express';
import AsyncHandler from "express-async-handler";
import categoryModel from "../models/categoryModel";
import listSubcategoryModel from "../models/listSubcategoryModel";
import listsubcategoryModel from "../models/listSubcategoryModel";
import subcategoryModel from "../models/subcategoryModel";
import slug from "slug";
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';



interface ICategory {
    name: string;
    status: number;
    slug: string;
}

interface CategoryStatusUpdate {
    id: string;
    status: number;
}

interface IExCategory {
    category: string;
    name?: string;
    slug?: string;
}

export const addCategory = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, status } = req.body as ICategory;
        const categorycheck = await categoryModel.findOne({ name });
        if (categorycheck) {
            res.status(400).send({
                success: false,
                message: "Category is already added"
            });
        }

        const category = await categoryModel.create({ name, status, slug: slug(name) });
        if (category) {
             res.status(200).send({
                success: true,
                message: "Category added successfully",
                category
            });
        } else {
             res.status(400).send({
                success: false,
                message: "Category is already added"
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

export const getCategory = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const category = await categoryModel.find({});
    
    res.status(200).send({
        success: true,
        message: "get all category",
        category
    });
});

export const manageFrontCategory = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const category = await categoryModel.aggregate([
        {
            $lookup: {
                from: "subcategories",
                localField: "_id",
                foreignField: "category_id",
                as: "subcategories",
            }
        },
        {
            $unwind: "$subcategories"
        },
        {
            $lookup: {
                from: 'listsubcategories',
                localField: 'subcategories._id',
                foreignField: 'subcategory_id',
                as: 'subcategories.listsubcategories',
            },
        },
        {
            $group: {
                _id: "$_id",
                name: { $first: "$name" },
                subcategories: { $push: "$subcategories" }
            }
        }
    ]);

    res.status(200).send({
        success: true,
        message: "get all category",
        category
    });
});

export const manageFrontsubCategory = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const subcategory = await subcategoryModel.find({ category_id: new mongoose.Types.ObjectId(id) });

     res.status(200).send({
        success: true,
        message: "get sub category",
        subcategory
    });
});

export const manageFrontlistsubCategory = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const listsubcategory = await listsubcategoryModel.find({ category_id: new mongoose.Types.ObjectId(id) });

     res.status(200).send({
        success: true,
        message: "get all category",
        listsubcategory
    });
});

export const categoryPagination = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const search: string = req.query.search as string;
    let category;

    if (search) {
        category = await categoryModel.find({ name: { $regex: search, $options: "i" } }).sort([['_id', -1]]);
    } else {
        category = await categoryModel.find({}).sort([['_id', -1]]);
    }

    const page: number = parseInt(req.query.page as string);
    const limit: number = parseInt(req.query.limit as string);

    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;

    const results: any = {};
    results.totalUser = category.length;
    results.pageCount = Math.ceil(category.length / limit);

    if (lastIndex < category.length) {
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
    results.result = category.slice(startIndex, lastIndex);

    res.status(200).send({
        success: true,
        message: "get all category",
        results
    });
});

export const activeCategory = AsyncHandler(async (req: Request, res: Response): Promise<void> =>  {
    try {
        const { id, status }: CategoryStatusUpdate = req.body;
        const categorycheck = await categoryModel.findOne({ _id: id })
        if (categorycheck) {

            const category = await categoryModel.updateOne({ _id: id }, { $set: { status: status } })
            if (category) {
                    res.status(200).send({
                    success: true,
                    message: "Category status updated successfully",
                    category
                })
            } else {
                    res.status(400).send({
                    success: false,
                    message: "Category status update failed"
                })
            }
        } else {
                res.status(400).send({
                success: false,
                message: "Category is invalid"
            })
        }

    } catch (e:any) {
        res.status(400).send({
            success: false,
            message: e.message,
            error: e.message
        })
    }
});

export const deleteCategory = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        const { id }: { id: string } = req.body;
   
        // Ensure the id is converted to an ObjectId
        const categorycheck = await categoryModel.findOne({ _id: id });
        
        if (categorycheck) {
            const category = await categoryModel.deleteOne({ _id: id });

            if (category.deletedCount !== 0) {
                res.status(200).send({
                    success: true,
                    message: "Category deleted successfully",
                    category
                });
            } else {
                res.status(400).send({
                    success: false,
                    message: "Category deletion failed"
                });
            }
        } else {
            res.status(400).send({
                success: false,
                message: "Category is invalid",
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

export const deleteallCategory = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        console.log(req.body);
        const validIds: mongoose.Types.ObjectId[] = [];
        const invalidIds: string[] = [];
        console.log('firstInvalid IDs:', invalidIds);

        for (const id of req.body) {
            if (mongoose.Types.ObjectId.isValid(id)) {
                const document = await categoryModel.findOne({ _id: new mongoose.Types.ObjectId(id) });
                if (document) {
                    console.log("print1");
                    validIds.push(new mongoose.Types.ObjectId(id));
                } else {
                    console.log("print2");
                    invalidIds.push(id);
                }
            } else {
                invalidIds.push(id);
            }
        }

        console.log('Valid IDs:', validIds);
        console.log('Invalid IDs:', invalidIds);
        console.log('length :', invalidIds.length);

        if (invalidIds.length === 0) {
            const category = await categoryModel.deleteMany({ _id: { $in: validIds } });
            if (category.deletedCount !== 0) {
                console.log('Valid IDs-262:', validIds);
                console.log('Invalid IDs-263:', invalidIds);
                res.status(200).send({
                    success: true,
                    message: "Category deleted successfully",
                    category
                });
            } else {
                 res.status(400).send({
                    success: false,
                    message: "Category deletion failed"
                });
            }
        } else {
             res.status(400).send({
                success: false,
                message: "CategoryId is invalid",
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


export const updateCategory = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, name, status } = req.body as { id: string, name: string, status: number };
        const categorycheck = await categoryModel.findOne({ _id: new mongoose.Types.ObjectId(id) });
        
        console.log(id);
        console.log(req.body);

        if (categorycheck) {
            const category = await categoryModel.updateOne(
                { _id: new mongoose.Types.ObjectId(id) },
                { $set: { name: name, status: status } }
            );
            if (category) {
                res.status(200).send({
                    success: true,
                    message: "Category updated successfully",
                    category
                });
            } else {
                res.status(400).send({
                    success: false,
                    message: "Category update failed"
                });
            }
        } else {
            res.status(400).send({
                success: false,
                message: "Category is invalid"
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

export const editCategory = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const category = await categoryModel.findById(new mongoose.Types.ObjectId(id));

     res.status(200).send({
        success: true,
        message: "get category",
        category
    });
});


export const addexcelCategory = AsyncHandler(async (req: Request, res: Response): Promise<void> => {

    try {
        const items: IExCategory[] = req.body;

        const itemsWithSlugs = items.map(item => ({
            ...item,
            name: item.category,
            slug: slug(item.category, { lower: true })
        }));

        await categoryModel.insertMany(itemsWithSlugs, { ordered: false, rawResult: true })
            .then((result) => {
                console.log('Raw result:', result);
                res.status(200).send({
                    success: true,
                    message: "Category added successfully",
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

