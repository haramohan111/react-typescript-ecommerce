import { Request, Response } from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import userModel from "../models/userModel";
import asyncHandler from "express-async-handler";
import { hashPassword } from "../helpers/authHelper";
import { generateAccessToken, generateRefreshToken, verifyToken } from "../utils/generateToken";
import Verify from '../models/verifyModel';


interface IUser {
    _id: mongoose.Types.ObjectId;
    firstName: string;
    lastName: string;
    mobileNo: string;
    password: string;
    status: number;
}

declare module 'express-session' {
    interface SessionData {
        user: string;
        userId: string;
        userIdg: string;
        userIdn: string;
        isadmin: string;
        isMobile: string;
        user_session_id:string;
    }
}

export const registerUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        const { firstName, lastName, mobileNo, password, status } = req.body as IUser;
        const nam = firstName + " " + lastName;
        // const newPassword = await hashPassword(password);
        const mobilecheck = await userModel.findOne({ mobile: mobileNo });

        if (mobilecheck) {
            res.status(400).send({
                success: false,
                message: "User already exists"
            });
        } else {
            const user = await userModel.create({
                name: nam,
                mobile: mobileNo,
                password,
                status
            });

            if (user) {
                res.status(200).send({
                    success: true,
                    message: "User added successfully",
                    user
                });
            } else {
                res.status(400).send({
                    success: false,
                    message: "User not added"
                });
            }
        }
    } catch (e: any) {
        res.status(400).send({
            success: false,
            message: e.message,
            error: e.message
        });
    }
});



// Interface for User
interface ILUser {
    mobileNo: string;
    password: string;
}

interface IUser extends mongoose.Document {
    firstName: string;
    lastName: string;
    mobile: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    status: number;
    isAdmin?: boolean;
    matchPassword: (enteredPassword: string) => Promise<string>;
    // Include other necessary fields
}

export const loginUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { mobileNo, password } = req.body as ILUser;
    const user = await userModel.findOne({ mobile: mobileNo }).select("-createdAt -updatedAt").exec() as IUser | null;

    if (!user) res.status(401).send('User not found please SignUp');
    // if (user) {
    //     const isMatch = await user.matchPassword(password);
    //     console.log('Password Match:', isMatch)
    // }
    if (user)
        //console.log("check",await user.matchPassword(password))
        if (user && await user.matchPassword(password)) {

            const accessToken = generateAccessToken(user._id.toString());
            const refreshToken = generateRefreshToken(user._id.toString());
            //res.cookie("accessToken", accessToken);

            if (user) {
                // Ensure _id is asserted to be a string
                // req.session.cookie.maxAge = 1000 * 60 * 60;
                const uid = user._id.toString();
                req.session.userId = uid;
                console.log(req.session);
                const user_session_id= "id" + Math.random().toString(16).slice(2)
                req.session.user_session_id = user_session_id;
                const userId = new mongoose.Types.ObjectId(user._id);

                let verifyuser;
                const verify = await Verify.findOne({user_id:user._id});
                
                if(!verify){
                verifyuser = await Verify.create({user_id: user._id,user_session_id});
                }
                const encryptedData = verifyToken(user._id.toString());
                res.cookie('uid', encryptedData,{ maxAge: 24 * 60 * 1000, httpOnly: false})
                res.status(200).send({
                    success: true,
                    message: "User login successfully",
                    accessToken,
                    refreshToken,
                });
            }
        } else {
            res.status(401).send({
                success: false,
                message: "Invalid mobile or password"
            });
        }
});


export const getUserProfile = asyncHandler(async (req, res) => {
    res.send("hhhhh")
})

