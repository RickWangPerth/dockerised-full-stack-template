import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';

interface AuthState {
  userEmail: string | null;
  userName: string | null;
  id: string | null;
}

const initialState: AuthState = {
  userEmail: null,
  userName: null,
  id: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{
        user: { id: string; username: string; email: string };
      }>
    ) => {
      console.log('Setting auth:', action.payload); // 调试输出
      state.userEmail = action.payload.user.email;
      state.userName = action.payload.user.username;
      state.id = action.payload.user.id;
    },
    clearAuth: () => initialState,
  },
});

export const { setAuth, clearAuth } = authSlice.actions;

export default authSlice.reducer;
