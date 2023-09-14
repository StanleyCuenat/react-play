import { useContext, useMemo } from "react";
import { IocContext } from "../Providers/IocProvider";

export type Newable<T> = new (...args: never[]) => T;

export function useController<T>(symbol: symbol) {
  const containerContext = useContext(IocContext);
  return useMemo(() => {
    return containerContext.get<T>(symbol);
  }, [containerContext, symbol]);
}
