import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
export const secret = "thisisRatn3shWaalaSecret";

export const authenticateJwt = ( req : Request, res: Response, next : NextFunction) => {
    const authHeader = req.headers.authorization;
    
    if(authHeader)
    {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, secret, (err, payload)=>{
            if (err) {
                return res.status(403).json({
                    msg : "authentication failed"
                });
            }
            if (!payload) {
                return res.status(403).json({
                    msg : "authentication failed"
                });
            }
            if (typeof payload === "string") {
                return res.status(403).json({
                    msg : "authentication failed"
                });
            }
            
            req.headers["adminId"] = payload.id;
            next();
            return;
        });
    }
    else{
        res.status(401).json({
            msg : "authentication failed"
        });
    }
};

