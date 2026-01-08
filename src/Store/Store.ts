import { configureStore } from "@reduxjs/toolkit";
import promptReducer from "../PromptSlice/PromptSlice";

export const Store = configureStore({
  reducer: {
    prompt: promptReducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
