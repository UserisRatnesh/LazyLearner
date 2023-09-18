import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { usernameState } from "../store/selectors/admin";
import { adminState } from "../store/atoms/admin";




const Appbar = () =>{
    const navigate = useNavigate();
    const username = useRecoilValue(usernameState);
    const setAdmin = useSetRecoilState(adminState);

    if(username){
        return (
            <div style={{
                display : "flex",
                justifyContent : "space-between",
                padding: 4,
                zIndex: 1
                }}>
                <div style={{ marginLeft: 10, cursor: "pointer"}} onClick={()=>{
                    navigate("/")
                }}>
                    <Typography variant={"h6"}>LazyLearner</Typography>
                </div>
                <div>
                    <Button  style={{marginRight: 10}} variant={"contained"} onClick={()=>{
                        navigate("/addCourse")
                    }}>Add Course</Button>
                    <Button  style={{marginRight: 10}} variant={"contained"} onClick={()=>{
                        console.log("All course biutton")
                        navigate("/courses")
                    }}>All Courses</Button>
                    <Button variant={"contained"} onClick={()=>{
                        localStorage.setItem("token",null);
                        setAdmin({
                            isLoading : false,
                            username : null
                        })
                        navigate("/");
                    }}>Logout</Button>
                </div>
                
            </div>
        )
    }

        return (
            <div style={{
                display : "flex",
                justifyContent : "space-between",
                padding: 4,
                zIndex: 1
                }}>
                <div style={{ marginLeft: 10, cursor: "pointer"}} onClick={()=>{
                    navigate("/")
                }}>
                    <Typography variant={"h6"}>LazyLearner</Typography>
                </div>
                <div>
                    <Button  style={{marginRight: 10}} variant={"contained"} onClick={()=>{
                        navigate("/signup")
                    }}>Signup</Button>
                    <Button variant={"contained"} onClick={()=>{
                        navigate("/login")
                    }}>Login</Button>
                </div>
                
            </div>
        )
    }


export default Appbar;