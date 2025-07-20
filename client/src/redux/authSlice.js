import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setToken: (state, action) => {
      state.token = action.payload || localStorage.getItem("token");
    },

    clearAuth: (state) => {
      state.token = null;

      state.user = null;
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setToken, clearAuth, setUser } = authSlice.actions;

export default authSlice.reducer;
