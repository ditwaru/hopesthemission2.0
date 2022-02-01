import { useState } from 'react';
import { loginApi } from 'pages/api/loginApi';

export const LoginForm = ({ setTokenState }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <form
      className="flex flex-col"
      onSubmit={async (e) => {
        e.preventDefault();
        const token = await loginApi(username, password);
        if (token !== 'error') setTokenState(token);
        setPassword('');
      }}
    >
      <label className="text-white" htmlFor="username">
        Username
      </label>
      <input
        onChange={(e) => setUsername(e.target.value)}
        className="border"
        type="email"
        id="username"
        value={username}
        name="username"
      />
      <label htmlFor="password">Password</label>
      <input
        onChange={(e) => setPassword(e.target.value)}
        className="border"
        type="password"
        id="password"
        value={password}
        name="password"
      />
      <button type="submit">Login</button>
    </form>
  );
};
