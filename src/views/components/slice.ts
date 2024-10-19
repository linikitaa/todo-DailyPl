import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../App";
import dayjs, { Dayjs } from "dayjs";
import { formatDate } from "../../data/helpers/date.ts";

const initialState: Task[] = [
  { id: "1", status: "active", title: "cook", date: "12/12/2222" },
  { id: "2", status: "active", title: "sport", date: "12/12/2222" },
  { id: "3", status: "completed", title: "less", date: "12/12/2222" },
];

const slice = createSlice({
  name: "task",
  initialState: initialState,
  reducers: {
    removeTask: (state: Task[], action: PayloadAction<{ taskId: string }>) => {
      const index = state.findIndex((task) => task.id === action.payload.taskId);
      if (index !== -1) {
        state.splice(index, 1); // Удаление элемента из массива
      }
    },
    addTask: (state: Task[], action: PayloadAction<{ title: string; date: Dayjs | null }>) => {
      if (action.payload.title.trim() !== "") {
        state.push({
          id: "5",
          title: action.payload.title,
          status: "active",
          date: formatDate(action.payload.date),
        });
      }
    },
    changeStatus: (state: Task[], action: PayloadAction<{ taskId }>) => {
      state.forEach((t) => {
        if (t.id === action.payload.taskId) {
          t.status = t.status === "active" ? "completed" : "active";
        }
      });
    },
    updateTitle: (state: Task[], action: PayloadAction<{ taskId: string; newTitle: string }>) => {
      // setTask(task.map((el) => (el.id === taskId ? { ...el, title: newTitle } : el)));
      state.forEach((t) => {
        if (t.id === action.payload.taskId) {
          t.title = action.payload.newTitle;
        }
      });
    },
  },
});

export const taskSlice = slice.reducer;
export const { removeTask, addTask, changeStatus, updateTitle } = slice.actions;
