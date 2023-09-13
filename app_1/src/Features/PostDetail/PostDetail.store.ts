import { inject, injectable } from "inversify";
import { PostRepository } from "../../Repositories/Post";
import { Thunk } from "../../Stores";
import { RESPONSE_STATUS } from "../../Repositories/HttpResponse.interface";
import { PostStore } from "../../Stores/Post.store";

@injectable()
export class PostDetailStore {
  private readonly _postRepository: PostRepository;
  private readonly _postStore: PostStore;
  constructor(
    @inject(PostRepository) postRepository: PostRepository,
    @inject(PostStore) postStore: PostStore
  ) {
    this._postRepository = postRepository;
    this._postStore = postStore;
    console.log(this._postRepository);
  }

  getPost =
    (id: number): Thunk<Promise<void>> =>
    async (dispatch) => {
      const result = await this._postRepository.get(id);
      if (result.status === RESPONSE_STATUS.KO) {
        return;
      }
      dispatch(this._postStore.getActions().addPost(result.data));
    };
}
