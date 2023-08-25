import { injectable } from "inversify";
import { LoginDto } from "../../Repositories/Authentication";

@injectable()
export class LocalStorage {
  readonly USER_AUTHENTICATION_INFO_PATH = "userInfo";

  setUserAuthenticationInfo(dto: LoginDto) {
    localStorage.setItem(
      this.USER_AUTHENTICATION_INFO_PATH,
      JSON.stringify(dto)
    );
  }

  getUserAuthenticationInfo(): LoginDto | undefined {
    const serializedValue = localStorage.getItem(
      this.USER_AUTHENTICATION_INFO_PATH
    );
    if (serializedValue === null) {
      return undefined;
    }
    return JSON.parse(serializedValue);
  }

  clearUserAuthenticationInfo() {
    localStorage.removeItem(this.USER_AUTHENTICATION_INFO_PATH);
  }
}
