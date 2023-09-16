import { selector } from "recoil";
import { adminState } from "../atoms/admin";

export const usernameState = selector({
    key : "usernameState",
    get : ({get})=>{
        const state = get(adminState);
        if(state){
            return state.username;
        }
        return null;
    }
})

export const isAdminLoadingState = selector({
    key: "isAdminLoadingState",
    get : ({get})=>{
        const state = get(adminState)
        if(state){
            return state.isLoading
        }
    }
})