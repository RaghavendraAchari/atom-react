import { createSlice } from "@reduxjs/toolkit";
import OperationStates from "../OperationStates";

export const albumSlice = createSlice(
    {
        name: "album",
        initialState: {
            albums: [],
            selectedAlbum: null,
            currentState: OperationStates.list,
            editedItem: null
        },
        reducers: {
            addAlbums: (state, action) => {
                state.albums = [...action.payload];
            },
            setSelectedItem: (state, { payload }) => {
                state.selectedAlbum = payload
            },
            setEditedItem: (state, { payload }) => {
                state.editedItem = payload
            },
            setCurrentState: (state, { payload }) => {
                state.currentState = payload
            }
        }
    }
);

export const { addAlbums, setSelectedItem, setEditedItem, setCurrentState } = albumSlice.actions;

export default albumSlice.reducer;