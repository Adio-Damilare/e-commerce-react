import { createSlice } from "@reduxjs/toolkit";
 const initialState={
    User:undefined,
    loginState:false,
 }
 const UserSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        AddCurrentUser:(state,action)=>{
            state.User=action.payload
        },
        UserLogOut:(state)=>{
            state.User=undefined;
            localStorage.removeItem("usertoken")
        },
        EditUser:(state,action)=>{
             let user =state.User;
            user={...user,email:action.payload.email,fullname:action.payload.fullname,phonenumber:Number(action.payload.phonenumber)}
           state.User=user;
            
        },
        LoginState:(state,action)=>{
            state.loginState=true
        }
            
    }
 })     

export const { AddCurrentUser,UserLogOut,EditUser,LoginState}=UserSlice.actions;
export default UserSlice.reducer;
export const SelectCurrentUser=(state)=>state.CurrentUser;
