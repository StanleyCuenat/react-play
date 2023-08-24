import { inject, injectable } from "inversify";
import type { IPost } from "../../Repositories/Post";
import { PostRepository } from "../../Repositories/Post";
import { action, observable } from "mobx";
import { RESPONSE_STATUS } from "../../Repositories/HttpResponse.interface";

@injectable()
export class PostDetailStore {
  @observable postId: number = 1;
  @observable userId: number = 1;
  @observable title: string = "";
  @observable body: string = "";

  @observable errorStatus: number | undefined;
  @observable loading = true;

  private readonly _postRepository: PostRepository;
  constructor(@inject(PostRepository) postRepository: PostRepository) {
    this._postRepository = postRepository;
  }

  @action setLoading(loading: boolean) {
    this.loading = loading;
  }

  @action setError(httpStatus?: number) {
    this.errorStatus = httpStatus;
  }

  @action setPostData(post: IPost) {
    (this.postId = post.id), (this.userId = post.userId);
    this.title = post.title;
    this.body = post.body;
  }

  @action async getPost(id: string) {
    this.setLoading(true);
    const post = await this._postRepository.get(id);
    if (post.status === RESPONSE_STATUS.KO) {
      this.setError(post.httpStatus);
      this.setLoading(false);
      return;
    }
    this.setPostData(post.data);
    this.setLoading(false);
  }
}
