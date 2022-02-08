export const loginApi = async (username: string, password: string) => {
  const body = JSON.stringify({ username, password });
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });

  if (res.status === 200) {
    const { jwt } = await res.json();
    await fetch('/api/setCookie', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: jwt }),
    });
    return jwt;
  }
  return 'error';
};
