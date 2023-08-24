import { inject, injectable } from "inversify";
import { action, observable } from "mobx";
import type {
  IAuthenticatedUser,
  LoginDto,
} from "../../Repositories/Authentication";
import { AuthenticationRepository } from "../../Repositories/Authentication";
import { RESPONSE_STATUS } from "../../Repositories/HttpResponse.interface";

@injectable()
export class AuthStore {
  @observable authenticatedUser?: IAuthenticatedUser;
  @observable loading = false;

  private readonly _authRepository: AuthenticationRepository;

  constructor(
    @inject(AuthenticationRepository) authRepository: AuthenticationRepository
  ) {
    this._authRepository = authRepository;
  }

  @action async logIn(logInDto: LoginDto) {
    this.loading = true;
    const user = await this._authRepository.logIn(logInDto);
    if (user.status === RESPONSE_STATUS.OK) {
      this.authenticatedUser = user.data;
      this.loading = false;
      return;
    }

    this.authenticatedUser = undefined;
    this.loading = false;
  }

  @action logOut() {
    this.authenticatedUser = undefined;
  }
}
