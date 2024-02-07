import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "@/utils/axios";

const intenalInitialState = {
  isAuth: false,
  accessToken: "",
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
      const loginResponse = await axios.post("/api/login", {
        email: email,
        password: password,
      });
      return {
        accessToken: loginResponse.data.accessToken,
        user: loginResponse.data.user,
      };
    } catch (error) {
      thunkAPI.rejectWithValue("Не удалось авторизоваться");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const loginResponse = await axios.delete("/api/logout");
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
      state.accessToken = action.payload.accessToken;
    },
    updateUserInfo: (state, action) => {
      state.user = action.payload.user;
      state.isAuth = true;
    },
    reset: () => intenalInitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
      state.isAuth = false;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.isLoading = false;
      state.isAuth = true;
      state.error = "";
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
export const { updateAccessToken, updateUserInfo, reset } = authSlice.actions;

export default authSlice.reducer;
