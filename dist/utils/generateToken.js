"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = generateAccessToken;
exports.generateRefreshToken = generateRefreshToken;
exports.verifyToken = verifyToken;
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
const jsonwebtoken_1 = require("jsonwebtoken");
function generateAccessToken(id) {
    const token = (0, jsonwebtoken_1.sign)({ id }, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: 'HS256',
        expiresIn: '60s'
    });
    return token;
}
function generateRefreshToken(id) {
    const token = (0, jsonwebtoken_1.sign)({ id }, process.env.REFRESH_TOKEN_SECRET, {
        algorithm: 'HS256',
        expiresIn: '1d'
    });
    return token;
}
function verifyToken(id) {
    const token = (0, jsonwebtoken_1.sign)({ id }, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: 'HS256',
        expiresIn: '1h'
    });
    return token;
}
//export default generateToken
