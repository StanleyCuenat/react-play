import { RepositoryResponse } from "../HttpResponse.interface";

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostDto {
  title: string;
  body: string;
}

export interface IPostRepository {
  list(): Promise<RepositoryResponse<IPost[]>>;
  get(id: string): Promise<RepositoryResponse<IPost>>;
  create(dto: PostDto): Promise<RepositoryResponse<IPost>>;
  update(id: string, dto: PostDto): Promise<RepositoryResponse<IPost>>;
  del(id: string): Promise<RepositoryResponse<IPost>>;
}
