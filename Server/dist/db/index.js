"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = exports.Admin = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const adminSchema = new mongoose_1.default.Schema({
    username: String,
    password: String,
});
const courseSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    imageLink: String,
    price: Number,
    published: Boolean,
    adminId: String
});
exports.Admin = mongoose_1.default.model('Admin', adminSchema);
exports.Course = mongoose_1.default.model('Course', courseSchema);
// similarly we can create schemas fro user.
