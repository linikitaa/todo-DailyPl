import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "task",
  initialState: [
    { id: 1, status: "active", title: "cook", date: "12/12/2222" },
    { id: 2, status: "active", title: "sport", date: "12/12/2222" },
    { id: 3, status: "completed", title: "less", date: "12/12/2222" },
  ],
  reducers: {
    removeTask: (state, action: PayloadAction<{ taskId: string }>) => {
      const index = state.findIndex((t) => t.id === action.payload.taskId);
      if (index !== -1) state.splice(index, 1);
    },
  },
});

export const authReducer = slice.reducer;
export const { removeTask } = slice.actions;
