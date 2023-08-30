import { inject, injectable } from "inversify";
import type {
  IAuthenticatedUser,
  LoginDto,
} from "../../Repositories/Authentication";
import { AuthenticationRepository } from "../../Repositories/Authentication";
import { RESPONSE_STATUS } from "../../Repositories/HttpResponse.interface";
import { LocalStorage } from "../LocalStorage/LocalStorage";
import { RootState, Thunk } from "../../Stores";
import {
  PayloadAction,
  Reducer,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

interface AuthReducer {
  authenticatedUser?: IAuthenticatedUser;
  loading: boolean;
}

@injectable()
export class AuthStore {
  private readonly _authRepository: AuthenticationRepository;
  private readonly _localStorage: LocalStorage;
  private readonly _initialState: AuthReducer = {
    authenticatedUser: undefined,
    loading: false,
  };
  private readonly _baseSelector = (state: RootState) => state.auth;
  _slice = createSlice({
    name: "AuthSlice",
    initialState: this._initialState,
    reducers: {
      setLoading: (state, action: PayloadAction<boolean>) => {
        state.loading = action.payload;
      },
      setAuthenticatedUser: (
        state,
        action: PayloadAction<IAuthenticatedUser | undefined>
      ) => {
        state.authenticatedUser = action.payload;
      },
    },
  });

  constructor(
    @inject(LocalStorage) localStorageAccessor: LocalStorage,
    @inject(AuthenticationRepository) authRepository: AuthenticationRepository
  ) {
    this._localStorage = localStorageAccessor;
    this._authRepository = authRepository;
  }

  getReducer(): Reducer<AuthReducer> {
    return this._slice.reducer;
  }
  authenticateFromLocaleStorage =
    (): Thunk<Promise<void>> => async (dispatch) => {
      const localStorageAuthenticated =
        this._localStorage.getUserAuthenticationInfo();
      if (localStorageAuthenticated === undefined) {
        return;
      }
      await dispatch(this.logIn(localStorageAuthenticated));
    };

  /*
   ** as dummyjson doesn't give a way to retrieve a user with his token
   ** we fake the authentication process with token by saving username & password in local storage
   */
  logIn =
    (logInDto: LoginDto): Thunk<Promise<boolean>> =>
    async (dispatch) => {
      dispatch(this._slice.actions.setLoading(true));
      const result = await this._authRepository.logIn(logInDto);
      if (result.status === RESPONSE_STATUS.KO) {
        this._localStorage.clearUserAuthenticationInfo();
        dispatch(this._slice.actions.setLoading(false));
        return false;
      }
      this._localStorage.setUserAuthenticationInfo(logInDto);
      dispatch(this._slice.actions.setAuthenticatedUser(result.data));
      dispatch(this._slice.actions.setLoading(false));
      return true;
    };

  logOut = (): Thunk<Promise<void>> => async (dispatch) => {
    dispatch(this._slice.actions.setAuthenticatedUser(undefined));
    dispatch(this._slice.actions.setLoading(false));
  };

  getAuthenticatedUser = () =>
    createSelector(this._baseSelector, (state) => state.authenticatedUser);
  getLoading = () =>
    createSelector(this._baseSelector, (state) => state.loading);
}
