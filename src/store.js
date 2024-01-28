import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js'


let cart = createSlice({
    name : 'cart',
    initialState : 
    [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers : {
        increaseQty(state, action) {
            let itemNum = state.findIndex((a) => { return a.id === action.payload; })
            state[itemNum].count++;
        },
        decreaseQty(state, action) {
            let itemNum = state.findIndex((a) => { return a.id === action.payload; })
            // Check if the item is in the cart
            if (itemNum !== -1) {
                if (state[itemNum].count > 0) {
                    state[itemNum].count--;
                }
            }
        },
        addCart(state, action) {
            let item = action.payload;
            let itemNum = state.findIndex((a) => { return a.id === item.id; })
            if (itemNum === -1) {
                state.push({...item, count : 1});
            } else {
                state[itemNum].count++;
            }
        },
        removeItem(state, action) {
            let itemNum = state.findIndex((a) => { return a.id === action.payload; })
            if (itemNum !== -1) {
                // Remove one element at specific index
                state.splice(itemNum, 1);
            }
        }
        
    }
})

export let { increaseQty, decreaseQty, addCart, removeItem } = cart.actions;

export default configureStore({
    reducer: {
        user : user.reducer,
        cart : cart.reducer
    }
})