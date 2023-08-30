import { useState } from "react";
import { useInjection } from "../../Modules/Ioc";
import { AuthStore } from "../../Modules/Auth/Auth.store";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Stores";
import Input from "../../Components/Systems/Input";

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
        value={username}
        onChange={setPassword}
        placeholder="password"
      />
      <button
        disabled={loading}
        onClick={() => dispatch(authStore.logIn({ username, password }))}
      >
        login
      </button>
    </div>
  );
}
