import {configureStore, } from "@reduxjs/toolkit"
import GoogleSlice from "../Component/RegisterPagesForUsers/GoogleSlice"
import { apiSlice } from "../Component/Apis/ApiSlice"
import AdminRedux from "../Component/AdminEnd/AdominDashboard/AdminRedux";
import UserRedux from  "../Component/RegisterPagesForUsers/UserRedux"
import CartRedux from "../Component/NavbarComponent/CartRedux";

export const store =configureStore({
    reducer:{
       [apiSlice.reducerPath]:apiSlice.reducer,
       currentAdmin:AdminRedux,
       google:GoogleSlice,
      CurrentUser:UserRedux,
      Cart:CartRedux,
    },
    middleware:getDefaultMiddleware=>getDefaultMiddleware().concat(apiSlice.middleware)
})

