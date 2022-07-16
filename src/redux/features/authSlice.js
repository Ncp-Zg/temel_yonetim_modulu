import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login_user: (state, action) => {
      state = { email: action.payload.email, isLoggedin:true };
      return state;
    },
  },
});

export default authSlice.reducer;
export const { login_user } = authSlice.actions;
