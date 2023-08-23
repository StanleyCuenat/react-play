import { inject, injectable } from "inversify";
import HttpProvider from "../HttpProvider";
import { IPostRepository, Post, PostDto } from "./Post.interface";

@injectable()
export class PostRepository implements IPostRepository {
  private _httpProvider: HttpProvider;

  constructor(@inject<HttpProvider>(HttpProvider) httpProvider: HttpProvider) {
    this._httpProvider = httpProvider;
  }

  async list() {
    const result = await this._httpProvider.get<Post[]>("/posts");
    if (result.success === false) {
      return Promise.reject(result);
    }
    return result.data;
  }

  async get(id: string) {
    const result = await this._httpProvider.get<Post>(`/posts/${id}`);
    if (result.success === false) {
      return Promise.reject(result);
    }
    return result.data;
  }

  async create(dto: PostDto) {
    const result = await this._httpProvider.post<Post, PostDto>(`/posts`, dto);
    if (result.success === false) {
      return Promise.reject(result);
    }
    return result.data;
  }

  async update(id: string, dto: PostDto) {
    const result = await this._httpProvider.put<Post, PostDto>(
      `/posts/${id}`,
      dto
    );
    if (result.success === false) {
      return Promise.reject(result);
    }
    return result.data;
  }

  async del(id: string) {
    const result = await this._httpProvider.del<Post>(`/posts/${id}`);
    if (result.success === false) {
      return Promise.reject(result);
    }
    return result.data;
  }
}
