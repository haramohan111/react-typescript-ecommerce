import express, { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser, getUserProfile } from '../../controller/userController';
import { protect } from '../../middleware/authMiddleware';
import jwt, { JwtPayload } from 'jsonwebtoken';
import userModel from '../../models/userModel';

interface CustomRequest extends Request {
  user?: any; // Modify this according to your user type
}
interface DecodedToken extends JwtPayload {
  id: string;
}
const router = express.Router();

router.post('/signup', (req: Request, res: Response, next: NextFunction) => registerUser(req, res, next));
router.post('/userlogin', (req: Request, res: Response, next: NextFunction) => loginUser(req, res, next));
router.get('/profile', protect, (req: CustomRequest, res: Response, next: NextFunction) => getUserProfile(req, res, next));

router.post('/userlogout', async (req: Request, res: Response) => {
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

    const decoded = jwt.verify(token, secret) as DecodedToken
    //console.log({ web: "web", id: (decoded as JwtPayload).id, token });

    const decodeUser = await userModel.findById(decoded.id) ;
    if (decodeUser) {
      res.status(200).send({ message: 'You have been Logged Out' });
    }else{
      res.status(200).send({ message: 'You have been Logged Out' });
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

router.post('/userrefresh', async (req: Request, res: Response) => {
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

export default router;
