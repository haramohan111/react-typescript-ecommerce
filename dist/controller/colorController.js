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
exports.getColor = exports.addColor = void 0;
const colorModel_1 = __importDefault(require("../models/colorModel"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.addColor = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = [{
                name: "red",
                status: 1
            }, {
                name: "green",
                status: 1
            }];
        const color = yield colorModel_1.default.insertMany(data);
        res.status(200).send({
            success: true,
            message: "Color added successfully",
            color
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
exports.getColor = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const color = yield colorModel_1.default.find({});
    res.status(200).send({
        success: true,
        message: "get all brands",
        color
    });
}));
