import { Navigate } from "react-router-dom";
import { useInjection } from "../Ioc";
import { AuthStore } from "./Auth.store";
import { PropsWithChildren } from "react";
import { useAppSelector } from "../../Stores";

export default function AuthGuard({ children }: PropsWithChildren) {
  const authStore = useInjection<AuthStore>(AuthStore);
  const authenticatedUser = useAppSelector(authStore.getAuthenticatedUser());
  if (authenticatedUser === undefined) {
    return <Navigate to="/authentication/login" />;
  }
  return children;
}
