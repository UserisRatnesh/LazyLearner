import {selector} from "recoil";
import {courseState}  from "../atoms/course";

export const isCourseLoading  =  selector({
  key : "isCourseLoadingState",
  get : ({get})=>{
    const state = get(courseState)
    return state.isLoading;
  }
})

export const courseTitle = selector({
  key : "coursetitleState",
  get : ({get})=>{
    const state = get(courseState)
    if(state.course)
    {
      return state.course.title

    }
    return "";
  }
})

export const courseDescription = selector({
  key : "courseDescriptionState",
  get : ({get})=>{
    const  state = get(courseState)
    if(state.course)
    {
      return state.course.description;
    }
    return "";
  }
})

export const courseImageLink = selector({
  key : "courseImageLinkState",
  get : ({get})=>{
    const state = get(courseState)
    if(state.course)
    {
      return state.course.imageLink;
    }
    return "";
  }
})

export const coursePrice = selector({
  key : "coursePriceState",
  get : ({get})=>{
    const state = get(courseState)
    if(state.course)
    {
      return state.course.price;
    }
    return -1;
  }
})

export const isLoadingState = selector({
  key: "isLoadingState",
  get : ({get})=>{
    const state = get(courseState)
    if(state )
    {
      return state.isLoading;
    }
  }
})

