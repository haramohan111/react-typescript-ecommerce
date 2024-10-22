import { Request, Response } from 'express';
import colorModel from "../models/colorModel";
import slug from "slug";
import asyncHandler from "express-async-handler";


interface IColor {
    name: string;
    status: number;
}

export const addColor = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        const data: IColor[] = [{
            name: "red",
            status: 1
        }, {
            name: "green",
            status: 1
        }];

        const color = await colorModel.insertMany(data);
        
        res.status(200).send({
            success: true,
            message: "Color added successfully",
            color
        });
    } catch (e: any) {
        res.status(400).send({
            success: false,
            message: e.message,
            error: e.message
        });
    }
});

export const getColor = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const color = await colorModel.find({});

     res.status(200).send({
        success: true,
        message: "get all brands",
        color
    });
});