export const loginApi = async (identifier, password) => {
  const body = JSON.stringify({ identifier, password });
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`, {
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
