import { createSlice } from "@reduxjs/toolkit";

export const albumSlice = createSlice(
    {
        name:"album",
        initialState:{
            albums:[]
        },
        reducers:{
            getAlbums: (state) => {

            },
            addAlbums: (state, action) => {

            }
        }
    }
);

export const {getAlbums, addAlbums} = albumSlice.actions;

export default albumSlice.reducer;