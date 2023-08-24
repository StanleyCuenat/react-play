import { useState } from "react";
import { useInjection } from "../../Modules/Ioc";
import { AuthStore } from "../../Modules/Auth/AuthStore";
import { Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

// fake authentication with dummyjson.com
// username: 'kminchelle',
// password: '0lelplR',

const Login = observer(() => {
  const authStore = useInjection<AuthStore>(AuthStore);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (authStore.authenticatedUser !== undefined) {
    return <Navigate to="/posts/" />;
  }

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        disabled={authStore.loading}
        onClick={() => authStore.logIn({ username, password })}
      >
        login
      </button>
    </div>
  );
});

export default Login;
