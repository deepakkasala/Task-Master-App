// redux/taskSlice.js

import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",

  initialState: {
    taskList: [],
  },

  reducers: {
    setTasks: (state, action) => {
      state.taskList = action.payload;
    },
  },
});

export const { setTasks } = taskSlice.actions;

export default taskSlice.reducer;
