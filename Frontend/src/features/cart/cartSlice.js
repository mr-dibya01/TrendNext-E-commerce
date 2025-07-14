import { createSlice } from '@reduxjs/toolkit'



const initialState=  {
    cartItems:[],
    buyNowItem:null
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state,action) => {
            if(state.cartItems.length == 0){
                state.cartItems.push(action.payload);
                console.log(state);
                return;
            }
            const existingProduct=state.cartItems.find((item)=>
                item.id === action.payload.id && item.size == action.payload.size
            )
            if(existingProduct){
                existingProduct.quantity +=action.payload.quantity;
            } else {
                state.cartItems.push(action.payload);
            }
        },
        removeToCart: (state,action) => {
            console.log(action.payload);
            state.cartItems=state.cartItems.filter((item) => item.id === action.payload.id && item.size !== action.payload.size)
        },
        increaseItem: (state,action) => {
            const exitingItem=state.cartItems.find((item)=>
                item.id === action.payload.id && item.size == action.payload.size
            )
            if(exitingItem) exitingItem.quantity += 1;
        },
        decreaseItem: (state,action) => {
            const exitingItem=state.cartItems.find((item)=>
                item.id === action.payload.id && item.size == action.payload.size
            )
            if(exitingItem) exitingItem.quantity -= 1;
        },
        setBuyNowItem:(state,action) => {
            state.buyNowItem=action.payload;
        }
    }
});


export const { addToCart ,removeToCart ,increaseItem ,decreaseItem ,setBuyNowItem }= cartSlice.actions;
export default cartSlice.reducer;