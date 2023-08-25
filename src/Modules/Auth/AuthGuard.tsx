import { Navigate } from "react-router-dom";
import { useInjection } from "../Ioc";
import { AuthStore } from "./AuthStore";
import { PropsWithChildren } from "react";
import { observer } from "mobx-react-lite";

const AuthGuard = observer(({ children }: PropsWithChildren) => {
  const authStore = useInjection<AuthStore>(AuthStore);
  if (authStore.authenticatedUser === undefined) {
    return <Navigate to="/authentication/login" />;
  }
  return children;
});

export default AuthGuard;
