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
exports.addexcelCategory = exports.editCategory = exports.updateCategory = exports.deleteallCategory = exports.deleteCategory = exports.activeCategory = exports.categoryPagination = exports.manageFrontlistsubCategory = exports.manageFrontsubCategory = exports.manageFrontCategory = exports.getCategory = exports.addCategory = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
const listSubcategoryModel_1 = __importDefault(require("../models/listSubcategoryModel"));
const subcategoryModel_1 = __importDefault(require("../models/subcategoryModel"));
const slug_1 = __importDefault(require("slug"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.addCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, status } = req.body;
        const categorycheck = yield categoryModel_1.default.findOne({ name });
        if (categorycheck) {
            res.status(400).send({
                success: false,
                message: "Category is already added"
            });
        }
        const category = yield categoryModel_1.default.create({ name, status, slug: (0, slug_1.default)(name) });
        if (category) {
            res.status(200).send({
                success: true,
                message: "Category added successfully",
                category
            });
        }
        else {
            res.status(400).send({
                success: false,
                message: "Category is already added"
            });
        }
    }
    catch (e) {
        res.status(400).send({
            success: false,
            message: "Something went wrong",
            error: e.message
        });
    }
}));
exports.getCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield categoryModel_1.default.find({});
    res.status(200).send({
        success: true,
        message: "get all category",
        category
    });
}));
exports.manageFrontCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield categoryModel_1.default.aggregate([
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
}));
exports.manageFrontsubCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const subcategory = yield subcategoryModel_1.default.find({ category_id: new mongoose_1.default.Types.ObjectId(id) });
    res.status(200).send({
        success: true,
        message: "get sub category",
        subcategory
    });
}));
exports.manageFrontlistsubCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const listsubcategory = yield listSubcategoryModel_1.default.find({ category_id: new mongoose_1.default.Types.ObjectId(id) });
    res.status(200).send({
        success: true,
        message: "get all category",
        listsubcategory
    });
}));
exports.categoryPagination = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const search = req.query.search;
    let category;
    if (search) {
        category = yield categoryModel_1.default.find({ name: { $regex: search, $options: "i" } }).sort([['_id', -1]]);
    }
    else {
        category = yield categoryModel_1.default.find({}).sort([['_id', -1]]);
    }
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;
    const results = {};
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
}));
exports.activeCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, status } = req.body;
        const categorycheck = yield categoryModel_1.default.findOne({ _id: id });
        if (categorycheck) {
            const category = yield categoryModel_1.default.updateOne({ _id: id }, { $set: { status: status } });
            if (category) {
                res.status(200).send({
                    success: true,
                    message: "Category status updated successfully",
                    category
                });
            }
            else {
                res.status(400).send({
                    success: false,
                    message: "Category status update failed"
                });
            }
        }
        else {
            res.status(400).send({
                success: false,
                message: "Category is invalid"
            });
        }
    }
    catch (e) {
        res.status(400).send({
            success: false,
            message: e.message,
            error: e.message
        });
    }
}));
exports.deleteCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        // Ensure the id is converted to an ObjectId
        const categorycheck = yield categoryModel_1.default.findOne({ _id: id });
        if (categorycheck) {
            const category = yield categoryModel_1.default.deleteOne({ _id: id });
            if (category.deletedCount !== 0) {
                res.status(200).send({
                    success: true,
                    message: "Category deleted successfully",
                    category
                });
            }
            else {
                res.status(400).send({
                    success: false,
                    message: "Category deletion failed"
                });
            }
        }
        else {
            res.status(400).send({
                success: false,
                message: "Category is invalid",
            });
        }
    }
    catch (e) {
        res.status(400).send({
            success: false,
            message: "Something went wrong",
            error: e.message
        });
    }
}));
exports.deleteallCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const validIds = [];
        const invalidIds = [];
        console.log('firstInvalid IDs:', invalidIds);
        for (const id of req.body) {
            if (mongoose_1.default.Types.ObjectId.isValid(id)) {
                const document = yield categoryModel_1.default.findOne({ _id: new mongoose_1.default.Types.ObjectId(id) });
                if (document) {
                    console.log("print1");
                    validIds.push(new mongoose_1.default.Types.ObjectId(id));
                }
                else {
                    console.log("print2");
                    invalidIds.push(id);
                }
            }
            else {
                invalidIds.push(id);
            }
        }
        console.log('Valid IDs:', validIds);
        console.log('Invalid IDs:', invalidIds);
        console.log('length :', invalidIds.length);
        if (invalidIds.length === 0) {
            const category = yield categoryModel_1.default.deleteMany({ _id: { $in: validIds } });
            if (category.deletedCount !== 0) {
                console.log('Valid IDs-262:', validIds);
                console.log('Invalid IDs-263:', invalidIds);
                res.status(200).send({
                    success: true,
                    message: "Category deleted successfully",
                    category
                });
            }
            else {
                res.status(400).send({
                    success: false,
                    message: "Category deletion failed"
                });
            }
        }
        else {
            res.status(400).send({
                success: false,
                message: "CategoryId is invalid",
            });
        }
    }
    catch (e) {
        res.status(400).send({
            success: false,
            message: "Something went wrong",
            error: e.message
        });
    }
}));
exports.updateCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, status } = req.body;
        const categorycheck = yield categoryModel_1.default.findOne({ _id: new mongoose_1.default.Types.ObjectId(id) });
        console.log(id);
        console.log(req.body);
        if (categorycheck) {
            const category = yield categoryModel_1.default.updateOne({ _id: new mongoose_1.default.Types.ObjectId(id) }, { $set: { name: name, status: status } });
            if (category) {
                res.status(200).send({
                    success: true,
                    message: "Category updated successfully",
                    category
                });
            }
            else {
                res.status(400).send({
                    success: false,
                    message: "Category update failed"
                });
            }
        }
        else {
            res.status(400).send({
                success: false,
                message: "Category is invalid"
            });
        }
    }
    catch (e) {
        res.status(400).send({
            success: false,
            message: "Something went wrong",
            error: e.message
        });
    }
}));
exports.editCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const category = yield categoryModel_1.default.findById(new mongoose_1.default.Types.ObjectId(id));
    res.status(200).send({
        success: true,
        message: "get category",
        category
    });
}));
exports.addexcelCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = req.body;
        const itemsWithSlugs = items.map(item => (Object.assign(Object.assign({}, item), { name: item.category, slug: (0, slug_1.default)(item.category, { lower: true }) })));
        yield categoryModel_1.default.insertMany(itemsWithSlugs, { ordered: false, rawResult: true })
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
    }
    catch (e) {
        res.status(400).send({
            success: false,
            message: "Something went wrong",
            error: e.message
        });
    }
}));
