import { injectable } from "inversify";

@injectable()
export class Config {
  public API_BASE_URL: string;

  constructor() {
    this.API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    if (this.API_BASE_URL === undefined) {
      throw new Error(
        "API_BASE_URL is not defined, please set it in your .env"
      );
    }
  }
}
