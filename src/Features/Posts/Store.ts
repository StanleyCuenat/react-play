import { inject, injectable } from "inversify";
import { makeObservable, observable } from "mobx";
import { IPost, Post, PostRepository } from "../../Repositories/Post";
import { RESPONSE_STATUS } from "../../Repositories/HttpResponse.interface";

@injectable()
export class PostStore {
  @observable posts: Post[] = [];
  @observable canLoadMore: boolean = true;
  @observable error: number | undefined = undefined;
  @observable loading: boolean = false;

  pageNumber: number = 1;
  readonly _postRepository: PostRepository;

  constructor(@inject(PostRepository) postRepository: PostRepository) {
    makeObservable(this);
    this._postRepository = postRepository;
  }

  get() {
    return this.posts;
  }

  addPost(post: IPost) {
    this.posts.push(new Post(post));
  }

  async loadPost() {
    if (this.loading === true) {
      return;
    }
    this.loading = true;
    const result = await this._postRepository.list();
    this.loading = false;
    if (result.status === RESPONSE_STATUS.KO) {
      this.canLoadMore = false;
      this.error = result.httpStatus;
      return;
    }
    this.pageNumber += 1;
    if (result.data.length <= 0) {
      this.canLoadMore = false;
    }
    result.data.forEach((post) => this.addPost(post));
  }
}
