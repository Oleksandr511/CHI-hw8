import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../../api/userActions";
import { useEffect } from "react";
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData) => {
    // return await register(userData);
  }
);

export const loginUserStore = createAsyncThunk(
  "user/login",
  async (
    { username, password }: { username: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await loginUser(username, password);
      if (response.access_token) {
        dispatch(loginSuccess(response));
        localStorage.setItem("token", response.access_token);
        return response;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLogged: false,
    status: "idle",
  },

  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isLogged = true;
      console.log("l", state.isLogged);
    },
    login: (state, action) => {
      state.user = action.payload;
      state.isLogged = true;
      console.log("l", state.isLogged);
    },
    logout: (state) => {
      state.user = null;
      state.isLogged = false;
      console.log("l", state.isLogged);
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserStore.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserStore.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.user = action.payload;
      })
      .addCase(loginUserStore.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { loginSuccess, login, logout } = userSlice.actions;
export default userSlice.reducer;
