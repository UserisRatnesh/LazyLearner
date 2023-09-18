import axios from "axios";
import { Card, TextField, Button} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useSetRecoilState } from "recoil";
import { adminState } from "../store/atoms/admin";

const Signup =() =>{
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const setAdmin = useSetRecoilState(adminState);

    return (
        <div style={{display: "flex", minHeight: "80vh", justifyContent: "center", flexDirection: "column"}}>
            <div style={{display: "flex", justifyContent: "center"}}>
                <Card variant={"outlined"} style={{width: 400, padding: 20, marginTop: 30, height: "100%"}}>
                    <TextField 
                        style={{marginBottom: 10}}
                        onChange={(e)=>{
                            setUsername(e.target.value);
                        }}
                        fullWidth={true}
                        label="Username"
                        variant="outlined"
                    ></TextField>
                    <TextField 
                        style={{marginBottom: 10}}
                        onChange={(e)=>{
                            setPassword(e.target.value);
                        }}
                        fullWidth={true}
                        label="Password"
                        variant="outlined"
                        type = {"password"}
                    ></TextField>
                    <div style={{display: "flex", justifyContent : "space-between"}}>
                        <Button variant={"contained"} onClick={async ()=>{
                            const response = await axios.post("http://localhost:3000/adminauth/signup", {
                                username : username,
                                password : password
                            });
                            let data = response.data;
                            if(data.status === "error")
                            {
                                alert("User already present");
                            }
                            else{
                                localStorage.setItem("token", data.token);
                                setAdmin({
                                isLoading : false,
                                username : username
                                })
                                navigate("/courses");
                            }
                            
                        }}
                        >Signup</Button>    
                        <Button onClick={()=>{
                        navigate("/login");
                    }}>Login ?</Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Signup;