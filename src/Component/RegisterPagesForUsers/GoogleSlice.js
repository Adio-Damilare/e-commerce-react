import { createSlice } from "@reduxjs/toolkit";
const initialState={
    detail:undefined,
}
const GoogleSlice=createSlice({
    name:"google",
    initialState,
    reducers:{
        addUser:(state,action)=>{
            state.detail=action.payload
        }
    }
})


export const {addUser} =GoogleSlice.actions;
export default GoogleSlice.reducer; 
export const selectUser=(state)=>state.google;