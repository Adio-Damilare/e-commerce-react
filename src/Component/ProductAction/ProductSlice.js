import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../Apis/ApiSlice";
const productAdapter = createEntityAdapter({
})
const initialState = productAdapter.getInitialState()

export const ProductSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query({
      query: () => "/goods",
      transformResponse: responseData => {
        let DataOrigin = responseData?.goods.map(data => {
          data.id = data._id
          return data
        })
        return productAdapter.setAll(initialState, DataOrigin)
      },
      provideTags: (result, error, arg) => {
        return [{ type: "goods", id: "LIST" }, ...result.ids.map(id => ({ type: "goods", id }))]
      }

    }),

    addProduct: builder.mutation({
      query: (product) => ({
        url: "/goods/addproduct",
        method: "POST",
        body: product
      }),
      invalidatesTags: [{ type: "goods", id: "LIST" }],
    }),

    editGood: builder.mutation({
      query: (product) => ({
        url:`/goods/edit/${product.id}`,
        method:"PUT",
        body:product,
      }),
      invalidatesTags: [{ type: "goods", id: "LIST" }],
    }),
    deleteGood: builder.mutation({
      query: (product) => ({
        url:`/goods/delete/${product}`,
        method:"DELETE",
        body:product,
      }),
      invalidatesTags: [{ type: "goods", id: "LIST" }],
    })
  })
})

export const { useGetProductsQuery, useAddProductMutation,useEditGoodMutation,useDeleteGoodMutation } = ProductSlice
export const selectProductResult = ProductSlice.endpoints.getProducts.select();
const selectProductData = createSelector(selectProductResult, productResult => productResult.data);
export const { selectById, selectEntities, selectIds, selectAll, selectTotal } = productAdapter.getSelectors((state) => selectProductData(state) ?? initialState);