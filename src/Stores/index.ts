import { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import IocContainer from "../Modules/Ioc/ioc";
import { PostStore } from "./Post.store";
import { PostListStore } from "../Features/PostList/PostList.store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AuthStore } from "../Modules/Auth/Auth.store";

export const store = configureStore({
  reducer: {
    auth: IocContainer.getInstance().get<AuthStore>(AuthStore).getReducer(),
    post: IocContainer.getInstance().get<PostStore>(PostStore).getReducer(),
    postList: IocContainer.getInstance()
      .get<PostListStore>(PostListStore)
      .getReducer(),
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type Thunk<T = unknown> = ThunkAction<
  T,
  RootState,
  unknown,
  Action<string>
>;
