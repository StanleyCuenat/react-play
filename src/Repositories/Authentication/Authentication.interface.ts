import { RepositoryResponse } from "../HttpResponse.interface";

export interface IAuthenticatedUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface IAuthenticationRepository {
  logIn(dto: LoginDto): Promise<RepositoryResponse<IAuthenticatedUser>>;
}
