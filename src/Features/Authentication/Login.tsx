import { useState } from "react";
import { useInjection } from "../../Modules/Ioc";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Stores";
import { Input } from "../../Components/Systems";
import { AuthStore } from "../../Modules/Auth/Auth.store";

// fake authentication with dummyjson.com
// username: 'kminchelle',
// password: '0lelplR',

export default function Login() {
  const authStore = useInjection<AuthStore>(AuthStore);
  const authenticatedUser = useAppSelector(authStore.getAuthenticatedUser());
  const loading = useAppSelector(authStore.getLoading());
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async () => {
    await dispatch(authStore.logIn({ username, password }));
  };

  if (authenticatedUser !== undefined) {
    return <Navigate to="/posts/" />;
  }

  return (
    <div>
      <Input
        type="text"
        value={username}
        onChange={setUsername}
        placeholder="username"
      />
      <Input
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="password"
      />
      <button disabled={loading} onClick={onLogin}>
        login
      </button>
    </div>
  );
}
