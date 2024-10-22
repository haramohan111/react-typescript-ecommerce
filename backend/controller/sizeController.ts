import sizeModel from "../models/sizeModel"
import slug from "slug"
import asyncHandler from "express-async-handler"
import { Request, Response } from 'express';


// Interface for Size
interface ISize {
    name: string;
    status: number;
}

export const addSize = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        const data: ISize[] = [{
            name: "xl",
            status: 1
        }, {
            name: "s",
            status: 1
        }, {
            name: "m",
            status: 1
        }, {
            name: "xxl",
            status: 1
        }];

        const size = await sizeModel.insertMany(data);
        res.status(200).send({
            success: true,
            message: "Size added successfully",
            size
        });
    } catch (e: any) {
        res.status(400).send({
            success: false,
            message: e.message,
            error: e.message
        });
    }
});


export const getSize = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const size = await sizeModel.find({});

    res.status(200).send({
        success: true,
        message: "get all sizes",
        size
    });
});
