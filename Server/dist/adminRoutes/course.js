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
const zod_1 = require("zod");
const db_1 = require("../db");
const middleware_1 = require("../middleware");
const router = express_1.default.Router();
const courseInput = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    imageLink: zod_1.z.string(),
    price: zod_1.z.number(),
    published: zod_1.z.boolean()
});
// Add new Course
router.post("/addCourse", middleware_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let parsedCourseInput = courseInput.safeParse(req.body);
    if (!parsedCourseInput.success) {
        return res.status(411).json({
            msg: "Input validation for course detail is failed"
        });
    }
    const adminId = req.headers["adminId"];
    const newCourse = new db_1.Course({
        title: parsedCourseInput.data.title,
        description: parsedCourseInput.data.description,
        imageLink: parsedCourseInput.data.imageLink,
        price: parsedCourseInput.data.price,
        published: parsedCourseInput.data.published,
        adminId
    });
    yield newCourse.save();
    res.status(200).json({
        msg: "New course added successfully"
    });
}));
// Update existing course
router.put("/updateCourse/:courseId", middleware_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let adminId = req.headers["adminId"];
    let parsedCourseInput = courseInput.safeParse(req.body);
    if (!parsedCourseInput.success) {
        return res.status(411).json({
            msg: "input validation failed"
        });
    }
    let course = yield db_1.Course.findOneAndUpdate({ _id: req.params.courseId }, {
        title: parsedCourseInput.data.title,
        description: parsedCourseInput.data.description,
        imageLink: parsedCourseInput.data.imageLink,
        price: parsedCourseInput.data.price,
        published: parsedCourseInput.data.published,
        adminId
    }, { new: true });
    if (course) {
        return res.status(200).json({
            msg: "course updated"
        });
    }
    res.status(200).json({
        msg: "course not found "
    });
}));
// Delete existing course
router.delete("/deleteCourse/:courseId", middleware_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let adminId = req.headers["adminId"];
    const course = yield db_1.Course.findOneAndDelete({ _id: req.params.courseId });
    if (course) {
        return res.status(200).json({
            msg: "Course deleted"
        });
    }
    res.status(411).json({
        msg: "Could not find the course"
    });
}));
// List all courses added by particular admin
router.get("/courses", middleware_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // let adminId = req.headers["adminId"];
    let courses = yield db_1.Course.find({});
    if (courses) {
        return res.status(200).json({
            courses
        });
    }
    res.status(411).json({
        msg: "No course found"
    });
}));
// Get all courses available on site.
// router.get("/allCourses",authenticateJwt, async(req,res)=>{
//     let courses = await Course.find({ });
//     if(courses)
//     {
//         return res.status(200).json({
//             courses
//         });
//     }
//     prompt("No course available on the website");
//     res.status(411).json({
//         msg : "No course found"
//     })
// });
// Get a paricular course
router.get("/course/:courseId", middleware_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // let adminId = req.headers["adminId"];
    let courseId = req.params.courseId;
    let course = yield db_1.Course.findOne({ _id: courseId });
    if (course) {
        return res.status(200).json({
            course
        });
    }
    res.status(411).json({
        msg: "No course found"
    });
}));
exports.default = router;
