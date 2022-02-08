export const deleteBlogApi = async (id: string, token: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/blogs/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(res.status);
  return res.status;
};
