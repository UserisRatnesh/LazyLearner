import express from 'express';
import { z } from "zod";
import { Course } from "../db";
import { authenticateJwt } from '../middleware';

const router = express.Router();

const courseInput = z.object({
    title : z.string(),
    description : z.string(),
    imageLink : z.string(),
    price : z.number(),
    published : z.boolean()
});

// Add new Course
router.post("/addCourse", authenticateJwt, async(req,res)=>{
    let parsedCourseInput = courseInput.safeParse(req.body);
    if(!parsedCourseInput.success)
    {
        return res.status(411).json({
            msg : "Input validation for course detail is failed"
        });
    }
    const adminId = req.headers["adminId"];
    const newCourse = new Course({
        title : parsedCourseInput.data.title,
        description : parsedCourseInput.data.description,
        imageLink : parsedCourseInput.data.imageLink,
        price : parsedCourseInput.data.price,
        published : parsedCourseInput.data.published,
        adminId 
    });
    await newCourse.save();
    res.status(200).json({
        msg : "New course added successfully"
    })
});

// Update existing course
router.put("/updateCourse/:courseId",authenticateJwt, async(req,res)=>{
    let adminId = req.headers["adminId"];
    let parsedCourseInput = courseInput.safeParse(req.body);
    if(!parsedCourseInput.success)
    {
        return res.status(411).json({
            msg : "input validation failed"
        })
    }
    let course  = await Course.findOneAndUpdate({_id : req.params.courseId},{
        title : parsedCourseInput.data.title,
        description : parsedCourseInput.data.description,
        imageLink : parsedCourseInput.data.imageLink,
        price : parsedCourseInput.data.price,
        published : parsedCourseInput.data.published,
        adminId
        },{ new : true});

    if(course)
    {
        return res.status(200).json({
            msg : "course updated"
        })
    }
    res.status(200).json({
        msg : "course not found "
    })

});


// Delete existing course
router.delete("/deleteCourse/:courseId",authenticateJwt, async(req,res)=>{
    let adminId = req.headers["adminId"];
    const course = await Course.findOneAndDelete({_id : req.params.courseId});
    if(course){
        return res.status(200).json({
            msg : "Course deleted"
        });
    }

    res.status(411).json({
        msg : "Could not find the course"
    });
});

// List all courses added by particular admin
router.get("/courses",authenticateJwt, async(req,res)=>{
    // let adminId = req.headers["adminId"];
    let courses = await Course.find({ });
    if(courses)
    {
        return res.status(200).json({
            courses
        });
    }
    res.status(411).json({
        msg : "No course found"
    })
});


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

router.get("/course/:courseId",authenticateJwt, async(req,res)=>{
    // let adminId = req.headers["adminId"];
    let courseId = req.params.courseId;
    let course = await Course.findOne({ _id: courseId});
    if(course)
    {
        return res.status(200).json({
            course
        });
    }
    res.status(411).json({
        msg : "No course found"
    })
});


export default router;