import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageLink : String,
    price : Number,
    published : Boolean,
    adminId : String
});

export const Admin = mongoose.model('Admin', adminSchema);

export const Course = mongoose.model('Course', courseSchema);

// similarly we can create schemas fro user.