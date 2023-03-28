import { createSlice } from "@reduxjs/toolkit";

const intenalInitialState = {
  accessToken: "",
  user: {
    id: null,
    userName: null,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState: intenalInitialState,
  reducers: {
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload.token;
    },
    reset: () => intenalInitialState,
  },
  extraReducers: (builder) => {},
});
export const { updateAccessToken, reset } = authSlice.actions;
