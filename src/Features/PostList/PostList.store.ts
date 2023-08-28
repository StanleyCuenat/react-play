import { inject, injectable } from "inversify";
import { PostRepository } from "../../Repositories/Post";
import { PostStore } from "../../Stores/Post.store";
import {
  PayloadAction,
  Reducer,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import type { RootState, Thunk } from "../../Stores";
import { RESPONSE_STATUS } from "../../Repositories/HttpResponse.interface";
interface PostListReducer {
  ids: number[];
  pageNumber: number;
  canLoadMore: boolean;
}

@injectable()
export class PostListStore {
  private readonly _postRepository: PostRepository;
  private readonly _postStore: PostStore;
  private readonly _baseSelector = (state: RootState) => state.postList;
  private readonly _initialState: PostListReducer = {
    ids: [],
    pageNumber: 1,
    canLoadMore: true,
  };
  _slice = createSlice({
    name: "postList",
    initialState: this._initialState,
    reducers: {
      loadPost: (state, action: PayloadAction<number>) => {
        if (!state.ids.includes(action.payload)) {
          state.ids.push(action.payload);
        }
      },
      setCanLoadMore: (state, action: PayloadAction<boolean>) => {
        state.canLoadMore = action.payload;
      },
      setPageNumber: (state, action: PayloadAction<number>) => {
        state.pageNumber = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder.addCase(
        this._postStore.getActions().deletePost,
        (state, action) => {
          state.ids = state.ids.filter((id) => id !== action.payload);
        }
      );
    },
  });

  constructor(
    @inject(PostRepository) postRepository: PostRepository,
    @inject(PostStore) postStore: PostStore
  ) {
    this._postRepository = postRepository;
    this._postStore = postStore;
  }

  getReducer(): Reducer<PostListReducer> {
    return this._slice.reducer;
  }

  fetch = (): Thunk<Promise<boolean>> => async (dispatch, getState) => {
    const { pageNumber } = getState().postList;
    const result = await this._postRepository.list({
      limit: 10,
      skip: (pageNumber - 1) * 10,
    });
    if (result.status === RESPONSE_STATUS.KO) {
      dispatch(this._slice.actions.setCanLoadMore(false));
      return false;
    }
    if (result.data.length <= 0) {
      dispatch(this._slice.actions.setCanLoadMore(false));
    }
    result.data.forEach((post) => {
      dispatch(this._postStore.getActions().addPost(post));
      dispatch(this._slice.actions.loadPost(post.id));
    });
    dispatch(this._slice.actions.setPageNumber(pageNumber + 1));
    return Promise.resolve(true);
  };

  getList = () =>
    createSelector(this._baseSelector, (postList) => postList.ids);

  getPageNumber = () =>
    createSelector(this._baseSelector, (postList) => postList.pageNumber);
  getCanLoadMore = () =>
    createSelector(this._baseSelector, (postList) => postList.canLoadMore);
}
