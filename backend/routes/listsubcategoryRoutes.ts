import express, { Request, Response, NextFunction } from 'express';
import {
  addlistSubcategory,
  managelistSubcategory,
  getListsubcategorybyid,
  listsubcategoryPagination,
  deleteallListSubcategory,
  addexcelListSubCategory
} from '../controller/listsubcategoryController';

const router = express.Router();

router.post('/addlistsubcategory', (req: Request, res: Response, next: NextFunction) => addlistSubcategory(req, res, next));
router.get('/managesubcategory', (req: Request, res: Response, next: NextFunction) => managelistSubcategory(req, res, next));
router.get('/getlistsubcategorybyid/:id', (req: Request, res: Response, next: NextFunction) => getListsubcategorybyid(req, res, next));
router.get('/listsubcategorypagination', (req: Request, res: Response, next: NextFunction) => listsubcategoryPagination(req, res, next));
router.post('/deletealllistsubcategory', (req: Request, res: Response, next: NextFunction) => deleteallListSubcategory(req, res, next));
router.post('/importexcellistsubcategory', (req: Request, res: Response, next: NextFunction) => addexcelListSubCategory(req, res, next));

export default router;
