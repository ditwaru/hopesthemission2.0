export const updateEventApi = async (token, body) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/events/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  return res.status;
};
