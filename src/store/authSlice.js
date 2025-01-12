import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../services/apiClient";
import { jwtDecode } from "jwt-decode";

const initialState = {
  isAuthenticated: Boolean(localStorage.getItem("accessToken")),
  user: null,
  loading: false,
  error: null,
};

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
      if (!accessToken) return null;

      // Decode user information from accessToken
      const decodedToken = jwtDecode(accessToken);

      return { user: decodedToken };
    } catch (error) {
      return rejectWithValue("Failed to fetch user data");
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      // Call the server logout endpoint
      await apiClient.post("/api/v1/auth/logout");

      // Remove tokens from local storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      return true; // Logout successful
    } catch (error) {
      return rejectWithValue("Logout failed");
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
  },
  extraReducers: (builder) => {
    builder
      // handle login
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
      })
      // handle fetchCurrentUser
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      // handle logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload || "Logout failed.";
      });
  },
});

// Export actions and reducer
export const { setError } = authSlice.actions;
export default authSlice.reducer;
