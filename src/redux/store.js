import { configureStore } from "@reduxjs/toolkit";
import deviceTypeSlice from "./deviceTypeSlice";
import selectedTagsSlice from "./selectedTagsSlice";
import authSlice from "./slices/AuthSlice";

export const store = configureStore({
  reducer: {
    deviceType: deviceTypeSlice,
    selectedTagsSlice: selectedTagsSlice,
    authReducer: authSlice,
  },
});
