import { Navigate } from "react-router-dom";
import { useInjection } from "../Ioc";
import { AuthStore } from "./AuthStore";
import { PropsWithChildren } from "react";

export default function AuthGuard({ children }: PropsWithChildren) {
  const authStore = useInjection<AuthStore>(AuthStore);

  if (authStore.authenticatedUser === undefined) {
    return <Navigate to="/authentication/login" />;
  }
  return children;
}
