import { injectable } from "inversify";

@injectable()
export class Config {
  public API_BASE_URL: string;

  constructor() {
    this.API_BASE_URL = import.meta.env.API_BASE_URL;
  }
}
