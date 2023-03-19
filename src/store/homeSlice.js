import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
    name: 'home' , 
    initialState:{
        url:{name : "JS Dev"},
        genres:{}
    } , 
    reducers : {
        getApiConfiguration: (state , action) => {
            state.url = action.payload;
        } ,
        getGenres: (state , action) => {
            state.genres = action.payload;
        } ,
        getGenres1: (state , action) => {
            state.genres = action.payload;
        } ,
    }
})

export const {getApiConfiguration , getGenres , getGenres1} = homeSlice.actions;
export default homeSlice.reducer;