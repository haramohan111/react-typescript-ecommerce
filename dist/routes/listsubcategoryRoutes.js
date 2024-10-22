"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const listsubcategoryController_1 = require("../controller/listsubcategoryController");
const router = express_1.default.Router();
router.post('/addlistsubcategory', (req, res, next) => (0, listsubcategoryController_1.addlistSubcategory)(req, res, next));
router.get('/managesubcategory', (req, res, next) => (0, listsubcategoryController_1.managelistSubcategory)(req, res, next));
router.get('/getlistsubcategorybyid/:id', (req, res, next) => (0, listsubcategoryController_1.getListsubcategorybyid)(req, res, next));
router.get('/listsubcategorypagination', (req, res, next) => (0, listsubcategoryController_1.listsubcategoryPagination)(req, res, next));
router.post('/deletealllistsubcategory', (req, res, next) => (0, listsubcategoryController_1.deleteallListSubcategory)(req, res, next));
router.post('/importexcellistsubcategory', (req, res, next) => (0, listsubcategoryController_1.addexcelListSubCategory)(req, res, next));
exports.default = router;
