export const deleteEventApi = async (id, token) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/events/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.status;
};
