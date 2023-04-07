import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentVideo: null,
    loading: false,
    error: false,
};

export const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.loading= true;
        },
        fetchSuccess: (state, action) => {
            state.currentVideo= action.payload;
            state.loading= false;
        },
        fetchFailure: (state) => {
            state.loading= false;
            state.error= true;
        },
        handleLikeVideo: (state, action) => {
            state.currentVideo= action.payload.video;
        },
        handleDislikeVideo: (state, action) => {
            state.currentVideo= action.payload.video;
        },
    }
});

export const { fetchStart, fetchSuccess, fetchFailure, handleLikeVideo, handleDislikeVideo } = videoSlice.actions;

export default videoSlice.reducer;