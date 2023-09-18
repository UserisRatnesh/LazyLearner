import { z } from "zod";
import jwt from "jsonwebtoken";
import express from 'express';
import { authenticateJwt, secret } from "../middleware/";
import { Admin } from "../db";


const router = express.Router();

const signupInput = z.object({
    username : z.string(),
    password : z.string()
})



router.post("/signup", async(req,res )=>{
    let parsedInput  = signupInput.safeParse(req.body);
    if(!parsedInput.success)
    {
        return res.status(411).json({ 
            msg : "Input validation failed, try writing correct value"
        })
    }

    let username = parsedInput.data.username;
    let password = parsedInput.data.password;
    const admin = await Admin.findOne({ username : username});
    if(admin)
    {
        res.status(403).json({
            status : "error",
            msg : "admin already exist try login"
        })
    }
    else
    {
        const newAdmin = new Admin({username: username, password : password});
        await newAdmin.save();
        const token = jwt.sign({ id : newAdmin._id}, secret, {expiresIn : "1h" });
        res.json({ status : "success", msg : "Admin created successfully", token});
    }

});

router.post("/login", async(req,res)=>{
    let parsedInput = signupInput.safeParse(req.body);
    if(!parsedInput.success)
    {
        return res.status(411).json({ 
            msg : "input validation failed, Enter valid details"
        });
    }
    
    let username = parsedInput.data.username;
    let password = parsedInput.data.password;

    const admin = await Admin.findOne({ username : username, password : password});
    if(admin)
    {
        const token = jwt.sign({ id : admin._id}, secret, {expiresIn : "1h"});
        res.status(200).json({ status : "success", msg : 'Logged in successfully', token });
    }
    else{
        res.status(411).json({
            status : "error",
            msg : "user not found"
        })
    }
});

router.get("/me", authenticateJwt, async( req, res )=>{
    const adminId = req.headers["adminId"];
    const admin = await Admin.findOne({ _id : adminId });
    if (admin) {
        return res.json({ username: admin.username });
      } else {
        res.status(403).json({ message: 'Admin not logged in' });
      }
});


export default router;