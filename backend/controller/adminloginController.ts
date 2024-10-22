import { Request, Response } from 'express';
import User, { IUser } from '../models/userModel';
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken';
import { hashPassword } from '../helpers/authHelper';
import { createHashedPassword } from '../utils/generatePassword';

export const adminLogin = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const admin = await User.findOne({ email }) as IUser;
  // const pp = await createHashedPassword(password)
  // console.log(pp)
  // console.log(admin)
  if (admin && await admin.matchPassword(password)) {

    const accessToken = generateAccessToken(admin._id.toString());
    const refreshToken = generateRefreshToken(admin._id.toString());
    
    const user = await User.updateOne({ _id: admin._id }, { $set: { token: accessToken } });
    // if(!user){
    //   res.status(401).json({
    //     success: false,
    //     message: "something went wrong",
    //   });
    // }
    res.status(200).send({
      success: true,
      message: "login successfully",
      accessToken,
      refreshToken
    });
  } else {
    res.status(401).json({
      success: false,
      message: "unauthorized user",
    });
  }
}
