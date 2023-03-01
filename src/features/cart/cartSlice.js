import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  Items: [],
  amount: 0,
  total: 0,
  isLoading: false,
};

const url = 'https://course-api.com/react-useReducer-cart-project';

export const getItems = createAsyncThunk('cart/getItems', async (name,thunkAPI)=> {
  try {
    const resp = await axios(url);
    return resp.data; 
  } catch (error) {
    return thunkAPI.rejectWithValue('something went wrong');
  }
})

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state)=>{
      state.Items= [];
    },
    removeItem: (state, actions) => {
      const itemId = actions.payload;
      state.Items = state.Items.filter((item)=>item.id !== itemId)
    },
    increase: (state, {payload}) => {
      const cartItem = state.Items.find((item)=>item.id===payload)
      cartItem.amount=cartItem.amount+1
    },
    decrease: (state, {payload}) => {
      const cartItem = state.Items.find((item)=>item.id===payload)
      cartItem.amount=cartItem.amount-1
    },
    calculateTotals: (state)=>{
      let amount=0;
      let total=0;
      state.Items.forEach((item)=>{
        amount+=item.amount
        total+= item.amount*item.price
      })
      state.amount=amount
      state.total= total
    }
  },
  extraReducers: {
    [getItems.pending]: (state)=>{
      state.isLoading= true;
    },
    [getItems.fulfilled]: (state, actions)=>{
      state.isLoading=false;
      state.Items = actions.payload;
    },
    [getItems.rejected]: (state, actions)=>{
      console.log(actions.payload);
      state.isLoading= false;
    },
  }
});

export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions;

export default cartSlice.reducer;