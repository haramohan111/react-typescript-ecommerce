"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBrand = exports.addBrand = void 0;
const brandModel_1 = __importDefault(require("../models/brandModel"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const addBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = [
            { name: "samsung", status: 1 },
            { name: "LG", status: 1 }
        ];
        const brand = yield brandModel_1.default.insertMany(data);
        res.status(200).send({
            success: true,
            message: "Brand added successfully",
            brand
        });
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(400).send({
                success: false,
                message: e.message,
                error: e.message
            });
        }
        else {
            res.status(400).send({
                success: false,
                message: "An unknown error occurred",
                error: String(e)
            });
        }
    }
});
exports.addBrand = addBrand;
exports.getBrand = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const brand = yield brandModel_1.default.find({});
    res.status(200).send({
        success: true,
        message: "get all brands",
        brand
    });
}));
