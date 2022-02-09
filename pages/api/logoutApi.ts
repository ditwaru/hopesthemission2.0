export const logoutApi = async () => {
  await fetch('/api/removeCookie', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: '' }),
  });
};
