import { configureStore } from "@reduxjs/toolkit";
import stepReducer from "./features/fieldData";

export const store = configureStore({
  reducer: {
    stepReducer,
  },
});
