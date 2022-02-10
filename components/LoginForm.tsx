import { Dispatch, SetStateAction, useState } from 'react';
import { loginApi } from 'pages/api/loginApi';

export const LoginForm = ({
  setTokenState,
}: {
  setTokenState: Dispatch<SetStateAction<string>>;
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <form
      className="flex flex-col space-y-2"
      onSubmit={async (e) => {
        e.preventDefault();
        const token = await loginApi(username, password);
        if (token !== 'error') setTokenState(token);
        return setPassword('');
      }}
    >
      <div className="flex flex-col">
        <label htmlFor="username">Username</label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          className="py-1 px-3 rounded-lg border"
          type="text"
          id="username"
          value={username}
          name="username"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="py-1 px-3 rounded-lg border"
          type="password"
          id="password"
          value={password}
          name="password"
          required
        />
      </div>
      <button className="rounded-lg bg-gray-200 py-1 px-3" type="submit">
        Login
      </button>
    </form>
  );
};
