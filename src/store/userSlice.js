import { createSlice } from '@reduxjs/toolkit'

let user = createSlice({
    name : 'user',
    initialState : { name: 'Jason', age : 26 },
    reducers : {
        changeName(state) {
            state.name = 'Nick'
        }, 
        plusAge(state, action) {
            state.age += action.payload
        }
    }
})

export let { changeName, plusAge } = user.actions;

export default user;