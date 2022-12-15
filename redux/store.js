import { configureStore } from "@reduxjs/toolkit";
import deviceTypeSlice from "./deviceTypeSlice";

export const store = configureStore({
  reducer: { deviceType: deviceTypeSlice },
});
