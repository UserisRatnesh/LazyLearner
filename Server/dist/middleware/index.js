"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJwt = exports.secret = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.secret = "thisisRatn3shWaalaSecret";
const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, exports.secret, (err, payload) => {
            if (err) {
                return res.status(403).json({
                    msg: "authentication failed"
                });
            }
            if (!payload) {
                return res.status(403).json({
                    msg: "authentication failed"
                });
            }
            if (typeof payload === "string") {
                return res.status(403).json({
                    msg: "authentication failed"
                });
            }
            req.headers["adminId"] = payload.id;
            next();
            return;
        });
    }
    else {
        res.status(401).json({
            msg: "authentication failed"
        });
    }
};
exports.authenticateJwt = authenticateJwt;
