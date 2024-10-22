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
exports.getUserProfile = exports.loginUser = exports.registerUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const generateToken_1 = require("../utils/generateToken");
exports.registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, mobileNo, password, status } = req.body;
        const nam = firstName + " " + lastName;
        // const newPassword = await hashPassword(password);
        const mobilecheck = yield userModel_1.default.findOne({ mobile: mobileNo });
        if (mobilecheck) {
            res.status(400).send({
                success: false,
                message: "User already exists"
            });
        }
        else {
            const user = yield userModel_1.default.create({
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
            }
            else {
                res.status(400).send({
                    success: false,
                    message: "User not added"
                });
            }
        }
    }
    catch (e) {
        res.status(400).send({
            success: false,
            message: e.message,
            error: e.message
        });
    }
}));
exports.loginUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mobileNo, password } = req.body;
    const user = yield userModel_1.default.findOne({ mobile: mobileNo }).select("-createdAt -updatedAt").exec();
    if (!user)
        res.status(401).send('User not found please SignUp');
    // if (user) {
    //     const isMatch = await user.matchPassword(password);
    //     console.log('Password Match:', isMatch)
    // }
    if (user)
        console.log("check", yield user.matchPassword(password));
    if (user && (yield user.matchPassword(password))) {
        console.log(user);
        const accessToken = (0, generateToken_1.generateAccessToken)(user._id.toString());
        const refreshToken = (0, generateToken_1.generateRefreshToken)(user._id.toString());
        res.cookie("accessToken", accessToken);
        if (user) {
            // Ensure _id is asserted to be a string
            var userId = user._id.toString();
            res.status(200).send({
                success: true,
                message: "User login successfully",
                accessToken,
                refreshToken,
            });
        }
    }
    else {
        res.status(401).send({
            success: false,
            message: "Invalid mobile or password"
        });
    }
}));
exports.getUserProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("hhhhh");
}));
