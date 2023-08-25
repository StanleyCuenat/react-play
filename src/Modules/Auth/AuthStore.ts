import { inject, injectable } from "inversify";
import { action, makeAutoObservable, observable, runInAction } from "mobx";
import type {
  IAuthenticatedUser,
  LoginDto,
} from "../../Repositories/Authentication";
import { AuthenticationRepository } from "../../Repositories/Authentication";
import { RESPONSE_STATUS } from "../../Repositories/HttpResponse.interface";
import { LocalStorage } from "../LocalStorage/LocalStorage";

@injectable()
export class AuthStore {
  @observable authenticatedUser?: IAuthenticatedUser;
  @observable loading = false;

  private readonly _authRepository: AuthenticationRepository;
  private readonly _localStorage: LocalStorage;

  constructor(
    @inject(LocalStorage) localStorageAccessor: LocalStorage,
    @inject(AuthenticationRepository) authRepository: AuthenticationRepository
  ) {
    this._localStorage = localStorageAccessor;
    this._authRepository = authRepository;
    makeAutoObservable(this);
  }

  /*
   ** as dummyjson doesn't give a way to retrieve a user with his token
   ** we fake the authentication process with token by saving username & password in local storage
   */
  @action async authenticateFromLocaleStorage() {
    const user = this._localStorage.getUserAuthenticationInfo();
    if (user === undefined) {
      return;
    }
    return await this.logIn(user);
  }

  @action async logIn(logInDto: LoginDto) {
    this.loading = true;
    const user = await this._authRepository.logIn(logInDto);
    if (user.status === RESPONSE_STATUS.KO) {
      runInAction(() => {
        this.authenticatedUser = undefined;
        this.loading = false;
      });
      this._localStorage.clearUserAuthenticationInfo();
      return;
    }
    runInAction(() => {
      this.authenticatedUser = user.data;
      this.loading = false;
    });

    this._localStorage.setUserAuthenticationInfo(logInDto);
  }

  @action logOut() {
    this.authenticatedUser = undefined;
  }
}
