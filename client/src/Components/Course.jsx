
import { Card, Grid } from "@mui/material";
import { useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { Loading } from "./Loading";
import { isLoadingState } from "../store/selectors/course";
import { courseState } from "../store/atoms/course";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import { courseTitle, coursePrice,  courseImageLink } from "../store/selectors/course";

function Course() {
    let { courseId } = useParams();
    const isLoading = useRecoilValue(isLoadingState);
    const setCourse = useSetRecoilState(courseState);

    const init = async () => {
        const res = await axios.get("http://localhost:3000/admincourse/course/"+courseId, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setCourse({isLoading: false, course: res.data.course});
    }

    useEffect(() => {
        init();
    }, []);

    if( isLoading )
    {
        return <div><Loading/> </div>
    }
    else{

    
    return <div>
            <GrayTopper />
            <Grid container>
                <Grid item lg={8} md={12} sm={12}>
                    <UpdateCard />
                </Grid>
                <Grid item lg={4} md={12} sm={12}>
                    <CourseCard />
                </Grid>
            </Grid>
        </div>
    }
}

function GrayTopper() {
    const title = useRecoilValue(courseTitle);
    return <div style={{height: 250, background: "#212121", top: 0, width: "100vw", zIndex: 0, marginBottom: -250}}>
        <div style={{ height: 250, display: "flex", justifyContent: "center", flexDirection: "column"}}>
            <div>
                <Typography style={{color: "white", fontWeight: 600}} variant="h3" textAlign={"center"}>
                    {title}
                </Typography>
            </div>
        </div>
    </div>
}

function UpdateCard() {
    const navigate = useNavigate();
    const [courseDetails, setCourse] = useRecoilState(courseState);

    const [title, setTitle] = useState(courseDetails.course.title);
    const [description, setDescription] = useState(courseDetails.course.description);
    const [image, setImage] = useState(courseDetails.course.imageLink);
    const [price, setPrice] = useState(courseDetails.course.price);

    useEffect(() => {
        setTitle(courseDetails.course.title);
        setDescription(courseDetails.course.description);
        setImage(courseDetails.course.imageLink);
        setPrice(courseDetails.course.price);
    }, [courseDetails]);

    return <div style={{display: "flex", justifyContent: "center"}}>
    <Card varint={"outlined"} style={{maxWidth: 600, marginTop: 200}}>
        <div style={{padding: 20}}>
            <Typography style={{marginBottom: 10}}>Update course details</Typography>
            <TextField
                value={title}
                style={{marginBottom: 10}}
                onChange={(e) => {
                    setTitle(e.target.value)
                }}
                fullWidth={true}
                label="Title"
                variant="outlined"
            />

            <TextField
                value={description}
                style={{marginBottom: 10}}
                onChange={(e) => {
                    setDescription(e.target.value)
                }}
                fullWidth={true}
                label="Description"
                variant="outlined"
            />

            <TextField
                value={image}
                style={{marginBottom: 10}}
                onChange={(e) => {
                    setImage(e.target.value)
                }}
                fullWidth={true}
                label="Image link"
                variant="outlined"
            />
            <TextField
                value={price}
                style={{marginBottom: 10}}
                onChange={(e) => {
                    setPrice(parseFloat(e.target.value))
                }}
                fullWidth={true}
                label="Price"
                variant="outlined"
            />
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <Button
                    variant="contained"
                    onClick={async () => {
                        axios.put("http://localhost:3000/admincourse/updateCourse/" + courseDetails.course._id, {
                            title: title,
                            description: description,
                            imageLink: image,
                            published: true,
                            price
                        }, {
                            headers: {
                                "Content-type": "application/json",
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            }
                        });
                        let updatedCourse = {
                            _id: courseDetails.course._id,
                            title: title,
                            description: description,
                            imageLink: image,
                            price
                        };
                        setCourse({course: updatedCourse, isLoading: false});
                    }}
                > Update course</Button>
                <Button variant="contained" onClick={async()=>{
                    console.log(courseDetails.course._id);
                    const response = await axios.delete("http://localhost:3000/admincourse/deleteCourse/"+courseDetails.course._id,{
                        headers: {
                            "Content-type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    });
                    if(response.data)
                    {
                        alert("Course deleted Successfully");
                        navigate("/courses");
                    }
                }} >Remove</Button>
            </div>
        </div>
    </Card>
</div>
}

function CourseCard() {

    return <div style={{display: "flex",  marginTop: 50, justifyContent: "center", width: "100%"}}>
     <Card style={{
        margin: 10,
        width: 350,
        minHeight: 200,
        borderRadius: 20,
        marginRight: 50,
        paddingBottom: 15,
        zIndex: 2
    }}>
        <CourseCardImage></CourseCardImage>
        <div style={{marginLeft: 10}}>
            <CourseCardTitle></CourseCardTitle>
            <Typography variant="subtitle2" style={{color: "gray"}}>
                Price
            </Typography>
            <CourseCardPrice></CourseCardPrice>
        </div>
    </Card>
    </div>
}

function CourseCardImage(){
    const imageLink = useRecoilValue(courseImageLink);

    return <div>
        <img src={imageLink} style={{width: 350}} ></img>
    </div>
}

function CourseCardTitle(){
    const title = useRecoilValue(courseTitle);
    return <div>
        <Typography variant="h5">{title}</Typography>

    </div>
}

function CourseCardPrice(){
    const price = useRecoilValue(coursePrice);
    return <div>
        <Typography variant="subtitle1">
            <b>Rs {price} </b>
        </Typography>
    </div>
}

export {Course} ;