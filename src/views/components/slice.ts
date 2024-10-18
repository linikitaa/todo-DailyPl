import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../App";
import { Dayjs } from "dayjs";

const slice = createSlice({
  name: "task",
  initialState: [
    { id: "1", status: "active", title: "cook", date: "12/12/2222" },
    { id: "2", status: "active", title: "sport", date: "12/12/2222" },
    { id: "3", status: "completed", title: "less", date: "12/12/2222" },
  ],
  reducers: {
    removeTask: (state, action: PayloadAction<{ taskId: string }>) => {
      const index = state.findIndex((task) => task.id === action.payload.taskId);
      if (index !== -1) {
        state.splice(index, 1); // Удаление элемента из массива
      }
    },
    addTask: (state, action: PayloadAction<{ title: string; date: string | null }>) => {
      if (action.payload.title.trim() !== "" && action.payload.date) {
        state.push({ id: "5", title: action.payload.title, status: "active", date: action.payload.date });
      }
    },
    changeStatusTask: (state, action: PayloadAction<{ taskId }>) => {
      state.forEach((t) => {
        if (t.id === action.payload.taskId) {
          t.status = t.status === "active" ? "completed" : "active";
        }
      });
    },
  },
});

export const taskSlice = slice.reducer;
export const { removeTask, addTask, changeStatusTask } = slice.actions;
