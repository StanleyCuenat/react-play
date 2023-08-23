import { Container } from "inversify";
import HttpProvider from "../../Repositories/HttpProvider";
import Config from "../../Modules/Config";
import { PostRepository } from "../../Repositories/Post";

const container = new Container();
container.bind<HttpProvider>(HttpProvider).toSelf().inSingletonScope();
container.bind<Config>(Config).toSelf().inSingletonScope();
container.bind<PostRepository>(PostRepository).toSelf().inSingletonScope();
export default container;
