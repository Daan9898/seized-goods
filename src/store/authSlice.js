import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../services/apiClient";
import { jwtDecode } from "jwt-decode";

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

// Thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/api/v1/auth/login", credentials);
      const { accessToken, refreshToken } = response.data;

      const decodedToken = jwtDecode(accessToken);

      // Store tokens locally
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      return { user: decodedToken };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) throw new Error("No access token found");

      // Decode user information from accessToken
      const decodedToken = jwtDecode(accessToken);

      return { user: decodedToken };
    } catch (error) {
      return rejectWithValue("Failed to fetch user data");
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    logoutUser: (state) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed.";
      });
  },
});

// Export actions and reducer
export const { setError, logoutUser } = authSlice.actions;
export default authSlice.reducer;
