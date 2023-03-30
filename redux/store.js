import { configureStore, combineReducers, AnyAction } from "@reduxjs/toolkit";
import { createWrapper, MakeStore, HYDRATE } from "next-redux-wrapper";
import deviceTypeSlice from "./deviceTypeSlice";
import selectedTagsSlice from "./selectedTagsSlice";
import authSlice from "./slices/AuthSlice";

const combinedReducers = combineReducers({
    deviceType: deviceTypeSlice,
    selectedTagsSlice: selectedTagsSlice,
    authReducer: authSlice,
});

const rootReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  }
  return combinedReducers(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

const makeStore = () => store;

export const wrapper = createWrapper(makeStore, { storeKey: "key" });
