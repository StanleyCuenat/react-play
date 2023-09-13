import { useContext, useMemo } from "react";
import { IocContext } from "./IocProvider";

export type Newable<T> = new (...args: never[]) => T;

export function useInjection<T>(classConstructor: Newable<T>) {
  const containerContext = useContext(IocContext);
  return useMemo(() => {
    return containerContext.get<T>(classConstructor);
  }, [classConstructor, containerContext]);
}
