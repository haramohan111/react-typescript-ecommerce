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
const express_1 = __importDefault(require("express"));
const userController_1 = require("../../controller/userController");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const router = express_1.default.Router();
router.post('/signup', (req, res, next) => (0, userController_1.registerUser)(req, res, next));
router.post('/userlogin', (req, res, next) => (0, userController_1.loginUser)(req, res, next));
router.get('/profile', authMiddleware_1.protect, (req, res, next) => (0, userController_1.getUserProfile)(req, res, next));
router.post('/userlogout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            res.status(200).send({ message: 'You have been Logged Out' });
            return;
        }
        const secret = process.env.ACCESS_TOKEN_SECRET;
        if (!secret) {
            throw new Error('ACCESS_TOKEN_SECRET is not defined');
        }
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        //console.log({ web: "web", id: (decoded as JwtPayload).id, token });
        const decodeUser = yield userModel_1.default.findById(decoded.id);
        if (decodeUser) {
            res.status(200).send({ message: 'You have been Logged Out' });
        }
        else {
            res.status(200).send({ message: 'You have been Logged Out' });
        }
    }
    catch (error) {
        // res.status(400).send({ error: e, message: 'Logged out failed' });
        if (error instanceof Error) {
            if (error.name === 'TokenExpiredError') {
                console.error('Token has expired:', error);
                res.status(401).json({ message: 'Token has expired' });
            }
            else {
                console.error('Token verification failed:', error);
                res.status(403).json({ message: 'Invalid token' });
            }
        }
        else {
            console.error('Unexpected error:', error);
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
}));
router.post('/userrefresh', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.body;
    console.log("refreshToken", refreshToken);
    try {
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        if (!decoded) {
            res.status(401).send('Invalid refresh token');
        }
        const newAccessToken = jsonwebtoken_1.default.sign({ id: decoded.id }, process.env.ACCESS_TOKEN_SECRET, {
            algorithm: 'HS256',
            expiresIn: '60s'
        });
        yield userModel_1.default.updateOne({ _id: decoded.id }, { $set: { token: newAccessToken } });
        res.json({ accessToken: newAccessToken });
    }
    catch (error) {
        res.status(401).send('Invalid refresh token');
    }
}));
exports.default = router;
