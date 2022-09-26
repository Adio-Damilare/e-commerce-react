import { apiSlice } from "../../../Apis/ApiSlice";
import { createEntityAdapter,createSelector } from "@reduxjs/toolkit";

const Useradapter=createEntityAdapter({
})
const initialState=Useradapter.getInitialState()
export const UserSlice=apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
          query: () => "/admin",
          transformResponse: responseData => {
            let DataOrigin = responseData?.users.map(data => {
              data.id = data._id
              return data
            })
            return Useradapter.setAll(initialState, DataOrigin)
          },
          provideTags: (result, error, arg) => {
            return [{ type: "admin", id: "LIST" }, ...result.ids.map(id => ({ type: "admin", id }))]
          }
    
        })
    }),    
})

export const { useGetUsersQuery, } = UserSlice
export const selectUserResult = UserSlice.endpoints.getUsers.select();
const selectUserData = createSelector(selectUserResult, UserResult => UserResult.data);
export const { selectById:selectUsersById, selectEntities:selectUsersEntities, selectIds:selectUsersIds, selectAll:selectAllUsers, selectTotal:selectUserTotal } = Useradapter.getSelectors((state) => selectUserData(state) ?? initialState);