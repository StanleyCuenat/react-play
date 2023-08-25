import { RepositoryResponse } from "../HttpResponse.interface";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostDto {
  title: string;
  body: string;
}

export interface PostListQueryDto {
  limit: number;
  skip: number;
}

export interface IPostRepository {
  list(queryDto: PostListQueryDto): Promise<RepositoryResponse<Post[]>>;
  get(id: string): Promise<RepositoryResponse<Post>>;
  create(dto: PostDto): Promise<RepositoryResponse<Post>>;
  update(id: string, dto: PostDto): Promise<RepositoryResponse<Post>>;
  del(id: string): Promise<RepositoryResponse<Post>>;
}
