import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData) => {
    // return await register(userData);
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials, { dispatch }) => {
    const response = await login(credentials);
    if (response.success) {
      dispatch(loginSuccess(response.payload));
      localStorage.setItem("user", response.token);
    }
    return await login(credentials);
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
    },
    login: (state, action) => {
      state.user = action.payload;
      state.isLogged = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLogged = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { loginSuccess, login, logout } = userSlice.actions;
export default userSlice.reducer;
