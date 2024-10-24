import express, { Request, Response, NextFunction } from 'express';
import { addBrand, brandPagination, getBrand } from '../controller/brandController';
import {
  addColor,
  getColor
} from '../controller/colorController';
import {
  addSize,
  getSize,
  sizePagination
} from '../controller/sizeController';
import {
  addSeller,
  getSeller
} from '../controller/sellerController';
import {
  adminLogin
} from '../controller/adminloginController';
import jwt, { JwtPayload } from 'jsonwebtoken';

import {
  createOrder,
  orderPagination
} from '../controller/orderController';
import userModel from '../models/userModel';
import Verify from '../models/verifyModel';

const router = express.Router();

router.post('/addbrand', (req: Request, res: Response, next: NextFunction) => addBrand(req, res));
router.get('/brandpagination', (req: Request, res: Response, next: NextFunction) => brandPagination(req, res, next));
router.post('/color', (req: Request, res: Response, next: NextFunction) => addColor(req, res, next));
router.post('/addsize', (req: Request, res: Response, next: NextFunction) => addSize(req, res, next));
router.get('/sizepagination', (req: Request, res: Response, next: NextFunction) => sizePagination(req, res, next));

router.get('/getsize', (req: Request, res: Response, next: NextFunction) => getSize(req, res, next));
router.post('/seller', (req: Request, res: Response, next: NextFunction) => addSeller(req, res, next));
router.get('/getbrand', (req: Request, res: Response, next: NextFunction) => getBrand(req, res, next));
router.get('/getcolor', (req: Request, res: Response, next: NextFunction) => getColor(req, res, next));

router.get('/getseller', (req: Request, res: Response, next: NextFunction) => getSeller(req, res, next));
router.post('/adminlogin', (req: Request, res: Response, next: NextFunction) => adminLogin(req, res));
// router.get("/authcheck/:id", (req: Request, res: Response, next: NextFunction) => authCheck(req, res, next));
router.post('/createorder', (req: Request, res: Response, next: NextFunction) => createOrder(req, res, next));
router.get('/orderpagination', (req: Request, res: Response, next: NextFunction) => orderPagination(req, res, next));



router.post('/logout', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    const token: string | undefined = authHeader && authHeader.split(' ')[1];
    if (!token) {
      res.status(200).send({ message: 'You have been Logged Out' });
      return;
    }

    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
      throw new Error('ACCESS_TOKEN_SECRET is not defined');
    }

    const decoded = jwt.verify(token, secret) as JwtPayload | string;;
    //console.log({ web: "web", id: (decoded as JwtPayload).id, token });

    const user = await userModel.updateOne({ _id:(decoded as JwtPayload).id }, { $set: { token: "" } });
    console.log((decoded as JwtPayload).id)
    const verify = await Verify.deleteOne({ user_id: (decoded as JwtPayload).id })
    if (user && verify) {
      const dbToken = await userModel.findOne({ token });
      if (dbToken == null) {
        res.status(200).send({ message: 'You have been Logged Out' });
      } else {
        res.status(400).send({ message: 'Logged out failed' });
      }
    } else {
      res.status(400).send({ message: 'You have been Logged Out' });
    }
  } catch (error) {
    // res.status(400).send({ error: e, message: 'Logged out failed' });
    if (error instanceof Error) {
    if (error.name === 'TokenExpiredError') {
      console.error('Token has expired:', error);
      res.status(401).json({ message: 'Token has expired' });
    } else {
      console.error('Token verification failed:', error);
      res.status(403).json({ message: 'Invalid token' });
    }
  }else {
    console.error('Unexpected error:', error);
    res.status(500).json({ message: 'An unexpected error occurred' });
  }
  }
});

router.post('/refresh', async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  console.log("refreshToken", refreshToken);
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as { id: string };
    if (!decoded) {
      res.status(401).send('Invalid refresh token');
    }

    const newAccessToken = jwt.sign({ id: decoded.id }, process.env.ACCESS_TOKEN_SECRET!, {
      algorithm: 'HS256',
      expiresIn: '60s'
    });
    await userModel.updateOne({ _id: decoded.id }, { $set: { token: newAccessToken } });
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(401).send('Invalid refresh token');
  }
});
interface DecodedToken extends JwtPayload {
  id: string;
}
router.post('/verify', async (req: Request, res: Response) => {
  const { atoken } = req.body;

  try {
    const decode = jwt.verify(atoken, process.env.REFRESH_TOKEN_SECRET!) as DecodedToken;
console.log(decode.id)
    const decodeUser = await Verify.findOne({user_id:decode.id});
    console.log(decodeUser)
    if (!decodeUser) {
      res.status(401).send({success:false,message:'Session out'});
    }else{
      res.status(200).send({success:true,message:'Session In'});
    }
  } catch (error) {
    res.status(401).send('Logout Successfully');
  }
});

export default router;
