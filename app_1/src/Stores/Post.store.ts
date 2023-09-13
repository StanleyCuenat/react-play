import {
  createSelector,
  createSlice,
  PayloadAction,
  Reducer,
} from "@reduxjs/toolkit";
import { Post } from "../Repositories/Post";
import { injectable } from "inversify";
import { RootState } from ".";

interface PostReducer {
  entities: Record<number, Post>;
}

@injectable()
export class PostStore {
  private readonly _initialState: PostReducer = {
    entities: {},
  };
  private readonly _baseSelector = (state: RootState) => state.post;
  _slice = createSlice({
    name: "PostSlice",
    initialState: this._initialState,
    reducers: {
      addPost: (state, action: PayloadAction<Post>) => {
        state.entities[action.payload.id] = action.payload;
      },
      deletePost: (state, action: PayloadAction<number>) => {
        if (state.entities[action.payload]) {
          delete state.entities[action.payload];
        }
      },
    },
  });

  getReducer(): Reducer<PostReducer> {
    return this._slice.reducer;
  }

  getActions() {
    return this._slice.actions;
  }

  getPost = (id: number) =>
    createSelector(this._baseSelector, (store) => store.entities[id]);
}
