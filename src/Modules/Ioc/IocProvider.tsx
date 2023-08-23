import { Container } from "inversify";
import { PropsWithChildren, createContext } from "react";

interface IocProviderProps {
  container: Container;
}

export const IocContext = createContext<Container | undefined>(undefined);

export default function IocProvider(
  props: PropsWithChildren<IocProviderProps>
) {
  return (
    <IocContext.Provider value={props.container}>
      {props.children}
    </IocContext.Provider>
  );
}
