export const updateAboutApi = async (
  token: string,
  body: { title: string; body: string }
) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/about`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  return res.status;
};
