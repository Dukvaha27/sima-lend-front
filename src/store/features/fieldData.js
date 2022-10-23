import { createSelector, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./moqData";

const fieldDataSlice = createSlice({
  name: "fields",
  initialState,
  reducers:{
    addField:(state, action) => {
      state.fields.push(action.payload)
    }
  }
});

const { reducer, actions } = fieldDataSlice;

export const { addField } = actions;

const fieldData = (state) => state.stepReducer;

export const fieldSelector = createSelector(fieldData, (state) => state.fields);
export const stepsSelector = createSelector(fieldData, (state) => state.steps);

export default reducer;
