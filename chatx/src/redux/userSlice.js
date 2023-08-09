import {createSlice} from "@reduxjs/toolkit"

export const UserSlice = createSlice({
    name:"user",
    initialState:{
        currentUser:null,
        error:null,
        loading:false
    },
    reducers:{
        apiCallStart:(state)=>{
            state.loading = true;
            state.error = null;
        },
        apiCallEnd:(state,action)=>{
            state.loading = false;
            state.error = action.payload
        },
        authSucces:(state,action)=>{
            state.loading = false;
            state.error = false;
            state.currentUser = action.payload;
        },
        refreshState:(state)=>{
            state.error = null;
            state.loading = false
        },
        logout:(state)=>{
            state.currentUser = null;
            state.error = null;
            state.loading = false
        },
        updateUserSuccess:(state,action)=>{
            state.currentUser= action.payload;
            state.loading = false;
            state.error = false;
        }
    }
})

export const {apiCallStart,apiCallEnd,authSucces,refreshState,logout,updateUserSuccess} = UserSlice.actions;
export default UserSlice.reducer