import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"


export const apiSlice=createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({baseUrl:"https://daruzecommerce.herokuapp.com/"}),
    tagTypes:["goods","admin"],
    endpoints: builder=>({}),
})