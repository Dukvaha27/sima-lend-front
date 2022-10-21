import { createSelector, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./moqData";

const fieldDataSlice = createSlice({
  name: "fields",
  initialState,
});

const { reducer } = fieldDataSlice;

const fieldData = (state) => state.stepReducer;

export const fieldSelector = createSelector(fieldData, (state) => state.fields);
export const stepsSelector = createSelector(fieldData, (state) => state.steps);

export default reducer;
