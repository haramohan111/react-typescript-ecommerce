import { Request, Response } from 'express';
import Brand from "../models/brandModel";
import slug from "slug"
import asyncHandler from "express-async-handler"

interface IBrand {
    name: string;
    status: number;
}
export const addBrand = async (req: Request, res: Response): Promise<void> => {
    try {
        const data: IBrand[] = [
            { name: "samsung", status: 1 },
            { name: "LG", status: 1 }
        ];

        const brand = await Brand.insertMany(data)
        res.status(200).send({
            success: true,
            message: "Brand added successfully",
            brand
        })
    } catch (e: unknown) {
        if (e instanceof Error) {
            res.status(400).send({
                success: false,
                message: e.message,
                error: e.message
            });
        } else {
            res.status(400).send({
                success: false,
                message: "An unknown error occurred",
                error: String(e)
            });
        }
    }
}
    export const getBrand = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const brand = await Brand.find({})

        res.status(200).send({
            success: true,
            message: "get all brands",
            brand
        })
    })