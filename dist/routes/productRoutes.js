"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controller/productController");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: 'backend/uploads/' });
router.post('/addproducts', upload.single('photo'), (req, res, next) => (0, productController_1.addProducts)(req, res, next));
router.get('/products', (req, res, next) => (0, productController_1.getallProducts)(req, res, next));
router.get('/productbyid/:id', (req, res, next) => (0, productController_1.getProductsById)(req, res, next));
router.get('/manageproducts/', (req, res, next) => (0, productController_1.manageProducts)(req, res, next));
router.get('/manageproductspagination/', (req, res, next) => (0, productController_1.manageProductsPagination)(req, res, next));
exports.default = router;
