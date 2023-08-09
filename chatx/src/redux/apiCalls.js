
import { publicRequest, userRequest } from "../requestMethods";
import { apiCallEnd, apiCallStart, authSucces, updateUserSuccess } from "./userSlice"

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

//UPDATE USER
export const UpdateUser = async(dispatch,userId,updateData) =>{
    dispatch(apiCallStart());
    try {
        const res = await userRequest.put(`/auths/update/${userId}`,updateData);
        dispatch(updateUserSuccess(res.data));
    } catch (error) {
        console.log(error)
        dispatch(apiCallEnd(error.response.status))
    }
}