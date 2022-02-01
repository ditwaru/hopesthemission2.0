export const deleteEventApi = async (id, token) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/events/${id}`,
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
