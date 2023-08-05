
import { publicRequest } from "../requestMethods";
import { apiCallEnd, apiCallStart, authSucces } from "./userSlice"

//LOGIN CALL
export const LoginCall =async(dispatch,credentials)=>{
    dispatch(apiCallStart());
    try {
        const res = await publicRequest.post("/auths/login",credentials)
        dispatch(authSucces(res.data))    
    } catch (error) {    
        dispatch(apiCallEnd(error.response.status))  
    }
}


//SIGNUP CALL
export const SignupCall =async(dispatch,credentials)=>{
    dispatch(apiCallStart());
    try {
        const res = await publicRequest.post("/auths",credentials)
        dispatch(authSucces(res.data))    
    } catch (error) {    
        dispatch(apiCallEnd(error.response.status))  
    }
}