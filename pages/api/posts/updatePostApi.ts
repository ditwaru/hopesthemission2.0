export const updatePostApi = async (id, token, body) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  return res.status;
};
