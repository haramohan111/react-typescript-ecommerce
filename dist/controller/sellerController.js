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
exports.getSeller = exports.addSeller = void 0;
const sellerModel_1 = __importDefault(require("../models/sellerModel"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.addSeller = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = [{
                name: "FUNKKIDZ",
                status: 1
            }, {
                name: "SHOPPYPARK",
                status: 1
            }];
        const seller = yield sellerModel_1.default.insertMany(data);
        res.status(200).send({
            success: true,
            message: "Seller added successfully",
            seller
        });
    }
    catch (e) {
        res.status(400).send({
            success: false,
            message: e.message,
            error: e.message
        });
    }
}));
exports.getSeller = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const seller = yield sellerModel_1.default.find({});
    res.status(200).send({
        success: true,
        message: "get all sellers",
        seller
    });
}));
