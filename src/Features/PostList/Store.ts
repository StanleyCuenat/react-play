import { inject, injectable } from "inversify";
import { action, makeAutoObservable, observable } from "mobx";
import type { Post, PostListQueryDto } from "../../Repositories/Post";
import { PostRepository } from "../../Repositories/Post";
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
  REFRESH_AFTER = 60000; // ms refresh
  readonly _postRepository: PostRepository;

  constructor(@inject(PostRepository) postRepository: PostRepository) {
    makeAutoObservable(this);
    this._postRepository = postRepository;
  }

  @action setLoading(loading: boolean) {
    this.loading = loading;
  }

  @action addPost(post: Post) {
    this.posts.push(post);
  }

  @action setCanLoadMore(canLoadMore: boolean) {
    this.canLoadMore = canLoadMore;
  }

  @action setError(httpStatus?: number) {
    this.error = httpStatus;
  }

  @action resetState() {
    this.posts = [];
    this.canLoadMore = true;
    this.error = undefined;
    this.loading = false;
    this._pageNumber = 1;
    this._lastTsUpdate = Date.now();
  }

  @action async loadPost() {
    if (this._lastTsUpdate + this.REFRESH_AFTER <= Date.now()) {
      this.resetState();
    }
    if (this.loading === true) {
      return;
    }
    this.setLoading(true);
    const dto: PostListQueryDto = {
      limit: this._pageSize,
      skip: (this._pageNumber - 1) * this._pageSize,
    };
    const result = await this._postRepository.list(dto);
    if (result.status === RESPONSE_STATUS.KO) {
      this.setCanLoadMore(false);
      this.setError(result.httpStatus);
      return;
    }
    this._pageNumber += 1;
    if (result.data.length <= 0) {
      this.setCanLoadMore(false);
    }
    this.setLoading(false);
    result.data.forEach((post) => this.addPost(post));
  }
}

export async function postListLoader() {
  const postListStore =
    IocContainer.getInstance().get<PostListStore>(PostListStore);
  await postListStore.loadPost();
  return null;
}
