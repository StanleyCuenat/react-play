import { Container } from "inversify";
import { PropsWithChildren, createContext } from "react";

interface IocProviderProps {
  container: Container;
}

export const IocContext = createContext<Container>(new Container());

export default function IocProvider(
  props: PropsWithChildren<IocProviderProps>
) {
  return (
    <IocContext.Provider value={props.container}>
      {props.children}
    </IocContext.Provider>
  );
}
