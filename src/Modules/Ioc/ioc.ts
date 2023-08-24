import "reflect-metadata";
import { Container } from "inversify";
import HttpProvider from "../../Repositories/HttpProvider";
import Config from "../Config";
import { PostRepository } from "../../Repositories/Post";
import { PostListStore } from "../../Features/PostList/Store";
import { PostDetailStore } from "../../Features/PostDetail/Store";
import { AuthenticationRepository } from "../../Repositories/Authentication";
import { AuthStore } from "../Auth/AuthStore";

const IocContainer = (function () {
  let instance: Container | undefined;

  const initContainer = () => {
    const container = new Container();
    container.bind<HttpProvider>(HttpProvider).toSelf().inSingletonScope();
    container.bind<Config>(Config).toSelf().inSingletonScope();
    container.bind<PostRepository>(PostRepository).toSelf().inSingletonScope();
    container
      .bind<AuthenticationRepository>(AuthenticationRepository)
      .toSelf()
      .inSingletonScope();
    container.bind<PostListStore>(PostListStore).toSelf().inSingletonScope();
    container
      .bind<PostDetailStore>(PostDetailStore)
      .toSelf()
      .inSingletonScope();
    container.bind<AuthStore>(AuthStore).toSelf().inSingletonScope();
    return container;
  };

  return {
    getInstance: function () {
      if (!instance) {
        instance = initContainer();
      }
      return instance;
    },
  };
})();

export default IocContainer;
