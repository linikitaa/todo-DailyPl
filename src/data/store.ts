import { configureStore } from "@reduxjs/toolkit";
import { taskSlice } from "../views/components/slice.ts";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    tasks: taskSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppRootStateType = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
