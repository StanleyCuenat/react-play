import { inject, injectable } from "inversify";
import HttpProvider from "../HttpProvider";
import { RESPONSE_STATUS, RepositoryResponse } from "../HttpResponse.interface";
import { AxiosResponse } from "axios";
import {
  IAuthenticatedUser,
  IAuthenticationRepository,
  LoginDto,
} from "./Authentication.interface";

@injectable()
export default class AuthenticationRepository
  implements IAuthenticationRepository
{
  private _httpProvider: HttpProvider;

  constructor(@inject<HttpProvider>(HttpProvider) httpProvider: HttpProvider) {
    this._httpProvider = httpProvider;
  }

  private formatResponse<T>(
    result: AxiosResponse<T, unknown>
  ): RepositoryResponse<T> {
    if (result.status >= 200 && result.status <= 300) {
      return {
        httpStatus: result.status,
        status: RESPONSE_STATUS.OK,
        data: result.data,
      };
    }
    return {
      httpStatus: result.status,
      status: RESPONSE_STATUS.KO,
    };
  }

  async logIn(dto: LoginDto): Promise<RepositoryResponse<IAuthenticatedUser>> {
    const result = await this._httpProvider.post<IAuthenticatedUser, LoginDto>(
      "/auth/login",
      dto
    );
    return this.formatResponse(result);
  }
}
