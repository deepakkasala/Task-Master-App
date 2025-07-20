import { configureStore } from "@reduxjs/toolkit";

import themeReducer from "./themeSlice";

import authReducer from "./authSlice";

import taskReducer from "./taskSlice";

import searchReducer from "./searchSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,

    auth: authReducer,

    tasks: taskReducer,

    search: searchReducer,
  },
});

export default store;
