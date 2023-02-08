import { configureStore } from "@reduxjs/toolkit";
import deviceTypeSlice from "./deviceTypeSlice";
import selectedTagsSlice from "./selectedTagsSlice";

export const store = configureStore({
  reducer: {
    deviceType: deviceTypeSlice,
    selectedTagsSlice: selectedTagsSlice,
  },
});
