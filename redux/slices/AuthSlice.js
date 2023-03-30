import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosFront from "../../libs/axiosFront";

const intenalInitialState = {
  isAuth: false,
  accessToken: null,
  error: null,
  user: {
    id: null,
    userName: null,
  },
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const loginResponse = await axiosFront.post("/api/login", {
        email: email,
        password: password,
      });
      return {
        user: loginResponse.data.user,
        accessToken: loginResponse.data.accessToken,
      };
    } catch (error) {
      thunkAPI.rejectWithValue("Не удалось авторизоваться");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const loginResponse = await axiosFront.delete("/api/logout");
    return loginResponse;
  } catch (error) {
    thunkAPI.rejectWithValue("Не удалось авторизоваться");
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState: intenalInitialState,
  reducers: {
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload.token;
    },
    reset: () => intenalInitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
      state.isAuth = false;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.error = "";
      state.accessToken = action.payload.token;
      state.user = action.payload.user;
      state.isLoading = false;
      state.isAuth = true;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload.error;
      state.isLoading = false;
      state.isAuth = false;
    });

    builder.addCase(logout.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(logout.fulfilled, (state, action) => intenalInitialState);
  },
});

export default authSlice.reducer;
