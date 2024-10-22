import express, { Request, Response, NextFunction } from 'express';
import { getProductsById, getallProducts, addProducts, manageProducts, manageProductsPagination } from '../controller/productController';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'backend/uploads/' });

router.post('/addproducts', upload.single('photo'), (req: Request, res: Response, next: NextFunction) => addProducts(req, res, next));
router.get('/products', (req: Request, res: Response, next: NextFunction) => getallProducts(req, res, next));
router.get('/productbyid/:id', (req: Request, res: Response, next: NextFunction) => getProductsById(req, res, next));
router.get('/manageproducts/', (req: Request, res: Response, next: NextFunction) => manageProducts(req, res, next));
router.get('/manageproductspagination/', (req: Request, res: Response, next: NextFunction) => manageProductsPagination(req, res, next));

export default router;
