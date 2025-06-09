import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk('auth/login', async (credentials) => {
  const response = await axios.post('https://dummyjson.com/auth/login', credentials);
  return response.data;
});

const storedUser = localStorage.getItem('user');
const storedToken = localStorage.getItem('token');

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken || null,
  isAuthenticated: !!storedToken,
  status: 'idle',
  error: null
};

const authSlice = createSlice({
  name: 'auth',
    initialState,
  reducers: {

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.token = action.payload.token;
        state.isAuthenticated = true;

         localStorage.setItem('user', JSON.stringify(action.payload));
  localStorage.setItem('token', action.payload.token);
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
