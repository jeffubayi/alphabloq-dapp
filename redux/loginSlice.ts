import { createSlice } from '@reduxjs/toolkit';

export interface LoginState {
    isLoggedIn:boolean;
}

const initialState: LoginState = {
  isLoggedIn:false,
};

const loginSlice = createSlice({
  name: 'loginState',
  initialState,
  reducers: {
    setLoginState: (state) => {
        state.isLoggedIn = !state.isLoggedIn;
    },
  },
});

export const { setLoginState } = loginSlice.actions;

export default loginSlice.reducer;