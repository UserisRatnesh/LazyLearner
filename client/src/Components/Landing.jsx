import {Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {useRecoilValue} from "recoil";
import { isAdminLoadingState } from "../store/selectors/admin";
import { adminState } from "../store/atoms/admin";



const Landing = () => {
    const navigate = useNavigate()
    const username = useRecoilValue(adminState);
    const isAdminLoading = useRecoilValue(isAdminLoadingState);
    return <div>
        <Grid container style={{padding: "5vw"}}>
            <Grid item xs={12} md={6} lg={6}>
                <div style={{marginTop: 100}}>
                    <Typography variant={"h2"}>
                        LazyLaerner Admin
                    </Typography>
                    <Typography variant={"h5"}>
                        A place to learn, earn and grow
                    </Typography>
                    {!isAdminLoading && !username && <div style={{display: "flex", marginTop: 20}}>
                        <div style={{marginRight: 10}}>
                            <Button
                                size={"large"}
                                variant={"contained"}
                                onClick={() => {
                                    navigate("/signup")
                                }}
                            >Signup</Button>
                        </div>
                        <div>
                            <Button
                                size={"large"}
                                variant={"contained"}
                                onClick={() => {
                                    navigate("/signin")
                                }}
                            >Signin</Button>
                        </div>
                    </div>}
                </div>
                <div>
                </div>
            </Grid>
            <Grid item xs={12} md={6} lg={6}  style={{marginTop: 20}}>
                <img src="https://media.istockphoto.com/id/1299224038/vector/female-teacher-with-book-in-front-of-blackboard.jpg?s=170667a&w=0&k=20&c=PVW8gpr3hWBappYO1BrK43HBFfU2_bViDvISIvml6RU=" width={"100%"} />
            </Grid>
        </Grid>
    </div>
}


export default Landing;