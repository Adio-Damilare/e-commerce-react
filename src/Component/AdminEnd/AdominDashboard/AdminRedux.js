import { createSlice } from "@reduxjs/toolkit";

const initialState={
}
const AdminRedux=createSlice({
    name:"Admin",
    initialState,
    reducers:{
        AddAdmin:(state,action)=>{
            state.detail=action.payload
        },
        LogOut:(state)=>{
            state.detail={}
        },
        DeleteGood:(state,action)=>{
            state.DeleteGoodId=action.payload
        }
    }
})


export const {AddAdmin,LogOut,DeleteGood} =AdminRedux.actions;
export default AdminRedux.reducer;
export const AdminState=(state)=>state.currentAdmin;