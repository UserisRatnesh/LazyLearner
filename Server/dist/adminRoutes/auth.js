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
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware/");
const db_1 = require("../db");
const router = express_1.default.Router();
const signupInput = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string()
});
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let parsedInput = signupInput.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(411).json({
            msg: "Input validation failed, try writing correct value"
        });
    }
    let username = parsedInput.data.username;
    let password = parsedInput.data.password;
    const admin = yield db_1.Admin.findOne({ username: username });
    if (admin) {
        res.status(403).json({
            status: "error",
            msg: "admin already exist try login"
        });
    }
    else {
        const newAdmin = new db_1.Admin({ username: username, password: password });
        yield newAdmin.save();
        const token = jsonwebtoken_1.default.sign({ id: newAdmin._id }, middleware_1.secret, { expiresIn: "1h" });
        res.json({ status: "success", msg: "Admin created successfully", token });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let parsedInput = signupInput.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(411).json({
            msg: "input validation failed, Enter valid details"
        });
    }
    let username = parsedInput.data.username;
    let password = parsedInput.data.password;
    const admin = yield db_1.Admin.findOne({ username: username, password: password });
    if (admin) {
        const token = jsonwebtoken_1.default.sign({ id: admin._id }, middleware_1.secret, { expiresIn: "1h" });
        res.status(200).json({ status: "success", msg: 'Logged in successfully', token });
    }
    else {
        res.status(411).json({
            status: "error",
            msg: "user not found"
        });
    }
}));
router.get("/me", middleware_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const adminId = req.headers["adminId"];
    const admin = yield db_1.Admin.findOne({ _id: adminId });
    if (admin) {
        return res.json({ username: admin.username });
    }
    else {
        res.status(403).json({ message: 'Admin not logged in' });
    }
}));
exports.default = router;
