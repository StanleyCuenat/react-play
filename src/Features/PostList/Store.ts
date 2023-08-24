import { inject, injectable } from "inversify";
import { action, makeAutoObservable, observable } from "mobx";
import type { IPost } from "../../Repositories/Post";
import { Post, PostRepository } from "../../Repositories/Post";
import { RESPONSE_STATUS } from "../../Repositories/HttpResponse.interface";
import IocContainer from "../../Modules/Ioc/ioc";

@injectable()
export class PostListStore {
  @observable posts: Post[] = [];
  @observable canLoadMore: boolean = true;
  @observable error: number | undefined = undefined;
  @observable loading: boolean = false;

  _pageNumber: number = 1;
  _pageSize: number = 10;
  _lastTsUpdate: number = Date.now();
  readonly _postRepository: PostRepository;

  constructor(@inject(PostRepository) postRepository: PostRepository) {
    makeAutoObservable(this);
    this._postRepository = postRepository;
  }

  @action setLoading(loading: boolean) {
    this.loading = loading;
  }

  @action addPost(post: IPost) {
    this.posts.push(new Post(post));
  }

  @action setCanLoadMore(canLoadMore: boolean) {
    this.canLoadMore = canLoadMore;
  }

  @action setError(httpStatus?: number) {
    this.error = httpStatus;
  }

  @action async loadPost() {
    if (this.loading === true) {
      return;
    }
    this.setLoading(true);
    const result = await this._postRepository.list();
    if (result.status === RESPONSE_STATUS.KO) {
      this.setCanLoadMore(false);
      this.setError(result.httpStatus);
      return;
    }
    this._pageNumber += 1;
    const paginated = result.data.slice(
      (this._pageNumber - 1) * this._pageSize,
      this._pageNumber * this._pageSize
    );
    if (paginated.length <= 0) {
      this.setCanLoadMore(false);
    }
    this.setLoading(false);
    paginated.forEach((post) => this.addPost(post));
  }
}

export async function postListLoader() {
  const postListStore =
    IocContainer.getInstance().get<PostListStore>(PostListStore);
  await postListStore.loadPost();
  return null;
}
