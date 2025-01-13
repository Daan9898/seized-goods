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
      if (!accessToken) throw new Error("Token not found");

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
      return rejectWithValue(
        error.response?.data?.message || "An unexpected login error occurred."
      );
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
    resetLoading(state) {
      state.loading = false;
    },
    // other reducers (like logout if necessary)
  },
  extraReducers: (builder) => {
    // Handle loading states for login
    builder.addCase(login.pending, (state) => {
      state.loading = true; // Set loading to true when login is in progress
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false; // Set loading to false once login is successful
      state.user = action.payload.user;
      state.isAuthenticated = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false; // Set loading to false if login fails
      state.error = action.payload;
    });

    // Handle loading states for fetchCurrentUser
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.userLoading = true;
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
    });
    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    });
  },
});

// Export actions and reducer
export const { setError, resetLoading } = authSlice.actions;
export default authSlice.reducer;
