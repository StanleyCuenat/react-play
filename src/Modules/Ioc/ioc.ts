import "reflect-metadata";
import { Container } from "inversify";
import HttpProvider from "../../Repositories/HttpProvider";
import Config from "../Config";
import { PostRepository } from "../../Repositories/Post";
import { PostStore } from "../../Features/Posts/Store";

const IocContainer = (function () {
  let instance: Container | undefined;

  const initContainer = () => {
    const container = new Container();
    container.bind<HttpProvider>(HttpProvider).toSelf().inSingletonScope();
    container.bind<Config>(Config).toSelf().inSingletonScope();
    container.bind<PostRepository>(PostRepository).toSelf().inSingletonScope();
    container.bind<PostStore>(PostStore).toSelf().inSingletonScope();
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