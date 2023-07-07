import { createSlice } from "@reduxjs/toolkit";
import OperationStates from "../OperationStates";

export const artSlice = createSlice(
    {
        name: "art",
        initialState: {
            arts: [],
            selectedArt: null,
            currentState: OperationStates.list,
            editedItem: null
        },
        reducers: {
            addArts: (state, action) => {
                state.arts = [...action.payload];
            },
            setSelectedItem: (state, { payload }) => {
                state.selectedArt = payload
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

export const { addArts, setSelectedItem, setEditedItem, setCurrentState } = artSlice.actions;

export default artSlice.reducer;