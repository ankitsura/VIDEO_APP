import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const initialState = {
    currentUser: null,
    loading: false,
    error: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading= true;
        },
        loginSuccess: (state, action) => {
            state.currentUser= action.payload.others;
            localStorage.setItem('access_token',JSON.stringify(action?.payload));
            state.loading= false;
        },
        loginFailure: (state) => {
            state.loading= false;
            state.error= true;
        },
        logout: (state) => {
            state.currentUser= null;
            state.loading= false;
            state.error= false;
            localStorage.clear();
        },
        subscriptions: (state, action) => {
            if(state.currentUser.subscribedUsers.includes(action.payload._id)){
                state.currentUser.subscribedUsers.splice(
                    (state.currentUser.subscribedUsers.findIndex((userId) => userId === action.payload._id)),1);
            }else{
                state.currentUser.subscribedUsers.push(action.payload._id);
            }
        },
    }
});

export const { loginStart, loginSuccess, loginFailure, logout, subscriptions } = userSlice.actions;

export default userSlice.reducer;