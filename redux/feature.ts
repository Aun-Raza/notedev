import { User } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { value: User } = {
  value: {
    id: '',
    username: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => ({
      value: {
        id: action.payload.id,
        username: action.payload.username,
      },
    }),
    resetUser: () => initialState,
  },
});

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => ({
      value: {
        id: action.payload.id,
        username: action.payload.username,
      },
    }),
    resetUser: () => initialState,
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
