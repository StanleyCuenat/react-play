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

export interface IPostRepository {
  list(): Promise<Post[]>;
  get(id: string): Promise<Post>;
  create(dto: PostDto): Promise<Post>;
  update(id: string, dto: PostDto): Promise<Post>;
  del(id: string): Promise<Post>;
}
