import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import{SetCookies,GetCookies,RemovCookies} from "./Cookies/Cookies"
import { SelectCurrentUser } from "../RegisterPagesForUsers/UserRedux";
const Cart_URL = "https://e-comerce-node.vercel.app/user/"

const initialState = {
    store: undefined,
    status: "",
    total: 0,
   
}

export const AddCartToDb = createAsyncThunk("carts/AddCartToDb", async ({ UserId, cartId, amount }) => {
    try {
        const { data } = await axios.patch(`${Cart_URL}/addtocart/${UserId}`, { cartId ,amount})
        return data;

    } catch (err) {
        return err.message
    }
})
export const DeleteCartToDb = createAsyncThunk("carts/deleteCartToDb", async ({ UserId, cartId, amount }) => {
    try {
        const { data } = await axios.delete(`${Cart_URL}/deletecart/${UserId}+++${cartId}+++${amount}`,)
        return data;

    } catch (err) {
        return err.message
    }
})
export const MinusCartToDb = createAsyncThunk("carts/minuCartToDb", async ({ UserId, cartId, amount }) => {
    try {

        const { data } = await axios.patch(`${Cart_URL}/minuscart/${UserId}`,{ cartId ,amount} )
        return data;

    } catch (err) {
        return err.message
    }
})

const CartRedux = createSlice({
    name: 'carts',
    initialState,
    reducers: {
        GetInitialState: {
            reducer: (state, action) => {
                let store = JSON.parse(localStorage.getItem("Ecommercestore"))
                if (store) {
                    state.store = store;
                    for(let i =0 ;i<store.length;i++){
                        state.total+=store[i].amount;
                    }

                } else {
                    state.store = [];
                }
            }
        },
        ChangeStatus: (state, action) => {
            state.status = ""
        },
        AddCart: (state, action) => {
            let { e, amount } = (action.payload)
            let store = JSON.parse(localStorage.getItem("Ecommercestore"))
            state.total+=amount;
            if (store) {
                let found = store.find((good, index) => (good.id == e));
                if (found) {
                    for (let i = 0; i < store.length; i++) {
                        if (store[i].id == found.id) {
                            store[i].total += 1;
                            store[i].amount += amount;
                            break
                        }
                    }

                    state.store = store;
                    localStorage.Ecommercestore = JSON.stringify(store);
                } else {
                    store = [...store, { id: e, total: 1 ,amount:amount}]
                    state.store = store
                    localStorage.Ecommercestore = JSON.stringify(store);
                }
            } else {
                localStorage.Ecommercestore = JSON.stringify([{ id: e, total: 1 ,amount}])
                state.store = [{ id: e, total: 1 ,amount}]
            }

        },
        UserLogin: (state, action) => {
            state.status=false;
            state.store = action.payload.orderArray;
            state.total=action.payload.totalAmount
        },
        RemoveCart: (state, action) => {
            state.totalStatus = true;
            let { e } = (action.payload)
            let store = state.store;
            if (store) {
                let found = state.store.find(good => good.id == e);
                state.total -= found.amount
                store = store.filter(good => good.id !== e);
                localStorage.Ecommercestore = JSON.stringify(store);
                state.store = store;
            }
        },
        MinusCart: (state, action) => {
            let { e, amount } = (action.payload)
            state.totalStatus = true
            state.total -= amount;
            let store = JSON.parse(localStorage.getItem("Ecommercestore"))
            if (store) {
                let found = store.find((good, index) => (good.id == e));
                if (found.total >= 2) {
                    for (let i = 0; i < store.length; i++) {
                        if (store[i].id == found.id) {
                            store[i].total -= 1;
                            store[i].amount-=amount;
                            break
                        }
                    }

                    state.store = store;
                    localStorage.Ecommercestore = JSON.stringify(store);
                } else {
                    store = store.filter(good => good.id !== e);
                    localStorage.Ecommercestore = JSON.stringify(store);
                    state.store = store;
                }
            }
        },
        CheckOutFinish:(state,action)=>{
            state.store=undefined;
            state.total=0;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(AddCartToDb.fulfilled, (state, action) => {
            if (action.payload.status) {
                state.store = action.payload.order.orderArray;
                localStorage.Ecommercestore = JSON.stringify(action.payload.order.orderArray);
                state.status = "success";
                state.total = action.payload.order.totalAmount;
            } else {
                state.status = "failed";
            }
        }).addCase(DeleteCartToDb.fulfilled, (state, action) => {
            if (action.payload.status) {
                state.store = action.payload.order.orderArray;
                localStorage.Ecommercestore = JSON.stringify(action.payload.order.orderArray);
                state.status = "success";
                state.total = action.payload.order.totalAmount;
            } else {
                state.status = "failed";
            }
        })
        .addCase(MinusCartToDb.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.store = action.payload.order.orderArray;
                    localStorage.Ecommercestore = JSON.stringify(action.payload.order.orderArray);
                    state.status = "success";
                    state.total = action.payload.order.totalAmount;
                } else {
                    state.status = "failed";
                }
            })

    }
})

export const { AddCart, RemoveCart, GetInitialState, UserLogin, MinusCart, ChangeStatus, CheckOutFinish  } = CartRedux.actions;
export default CartRedux.reducer
export const SelectCurrentCart = (state) => state.Cart;