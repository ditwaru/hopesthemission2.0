export const deleteBlogApi = async (id, token) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/blogs/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return res.status;
};
