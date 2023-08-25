import { inject, injectable } from "inversify";
import HttpProvider from "../HttpProvider";
import {
  IPostRepository,
  Post,
  PostDto,
  PostListQueryDto,
} from "./Post.interface";
import { RESPONSE_STATUS, RepositoryResponse } from "../HttpResponse.interface";
import { AxiosResponse } from "axios";

@injectable()
export default class PostRepository implements IPostRepository {
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

  async list(queryDto: PostListQueryDto): Promise<RepositoryResponse<Post[]>> {
    const result = await this._httpProvider.get<
      { posts: Post[] },
      PostListQueryDto
    >("/posts", queryDto);
    if (result.status >= 200 && result.status <= 300) {
      return {
        httpStatus: result.status,
        status: RESPONSE_STATUS.OK,
        data: result.data.posts,
      };
    }
    return {
      httpStatus: result.status,
      status: RESPONSE_STATUS.KO,
    };
  }

  async get(id: string): Promise<RepositoryResponse<Post>> {
    const result = await this._httpProvider.get<Post, undefined>(
      `/posts/${id}`
    );
    return this.formatResponse(result);
  }

  async create(dto: PostDto): Promise<RepositoryResponse<Post>> {
    const result = await this._httpProvider.post<Post, PostDto>(`/posts`, dto);
    return this.formatResponse(result);
  }

  async update(id: string, dto: PostDto): Promise<RepositoryResponse<Post>> {
    const result = await this._httpProvider.put<Post, PostDto>(
      `/posts/${id}`,
      dto
    );
    return this.formatResponse(result);
  }

  async del(id: string): Promise<RepositoryResponse<Post>> {
    const result = await this._httpProvider.del<Post>(`/posts/${id}`);
    return this.formatResponse(result);
  }
}
