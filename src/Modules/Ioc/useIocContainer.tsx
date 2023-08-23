import { useContext } from "react";
import { IocContext } from "./IocProvider";

export type Newable<T> = new (...args: never[]) => T;
export function useIocContainer<T>(classConstructor: Newable<T>) {
  const containerContext = useContext(IocContext);
  if (containerContext == undefined) {
    throw new Error(
      "IOC is not defined, please set at your root component <IocProvider container={Container}>... </IocProvider>"
    );
  }
  return containerContext.get<T>(classConstructor);
}
