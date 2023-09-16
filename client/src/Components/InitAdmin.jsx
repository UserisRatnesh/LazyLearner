
import { useSetRecoilState } from "recoil";
import { adminState } from "../store/atoms/admin";
import { useEffect } from "react";
import axios from "axios";

function InitAdmin() {
    const setAdmin = useSetRecoilState(adminState);
    const init = async() => {
        try {
            const response = await axios.get("http://localhost:3000/adminauth/me", {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
  
            if (response.data.username) {
                console.log("InitAdmin");
                setAdmin({
                    isLoading: false,
                    username: response.data.username
                })
            } else {
                setAdmin({
                    isLoading: false,
                    username: null
                })
            }
        } catch (e) {
  
            setAdmin({
                isLoading: false,
                username: null
            })
        }
    };
  
    useEffect(() => {

        init();
    }, []);
  
    return <></>
}


export default InitAdmin;