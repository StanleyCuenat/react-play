import { makeObservable, observable } from "mobx";
import { IPost } from ".";

export default class Post {
  userId: number;
  id: number;
  @observable title: string;
  @observable body: string;

  constructor(post: IPost) {
    makeObservable(this);
    this.userId = post.userId;
    this.id = post.id;
    this.title = post.title;
    this.body = post.body;
  }
}
