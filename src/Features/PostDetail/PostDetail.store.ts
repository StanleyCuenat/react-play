import { inject, injectable } from "inversify";
import { PostRepository } from "../../Repositories/Post";

@injectable()
export class PostDetailStore {
  private readonly _postRepository: PostRepository;
  constructor(@inject(PostRepository) postRepository: PostRepository) {
    this._postRepository = postRepository;
  }
}
