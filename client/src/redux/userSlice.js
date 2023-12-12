import {createSlice} from '@reduxjs/toolkit'

const initialState={
    id:0,
    username:"",
    isAdmin:0
    
}

const userSlice=createSlice({
    name:"userSlice",
    initialState,
    reducers:{
        addUser:(state,action)=>{
            console.log("from userSlice",action.payload)
            state.id=action.payload.id;
            state.username=action.payload.username;
            state.isAdmin=action.payload.isAdmin;
        }
    }
})
export default userSlice.reducer
export const {addUser} =userSlice.actions;