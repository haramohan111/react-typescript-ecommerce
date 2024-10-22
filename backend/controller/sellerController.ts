import sellerModel from "../models/sellerModel"
import slug from "slug"
import asyncHandler from "express-async-handler"
import { Request, Response } from 'express';


interface ISeller {
    name: string;
    status: number;
}

export const addSeller = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        const data: ISeller[] = [{
            name: "FUNKKIDZ",
            status: 1
        }, {
            name: "SHOPPYPARK",
            status: 1
        }];

        const seller = await sellerModel.insertMany(data);
        res.status(200).send({
            success: true,
            message: "Seller added successfully",
            seller
        });
    } catch (e: any) {
        res.status(400).send({
            success: false,
            message: e.message,
            error: e.message
        });
    }
});


export const getSeller = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const seller = await sellerModel.find({});

     res.status(200).send({
        success: true,
        message: "get all sellers",
        seller
    });
});