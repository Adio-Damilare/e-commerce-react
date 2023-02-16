import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"


export const apiSlice=createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({baseUrl:"https://e-comerce-node.vercel.app/"}),
    tagTypes:["goods","admin"],
    endpoints: builder=>({}),
})