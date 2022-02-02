export const createEventApi = async (token, body) => {
  const JSONbody = JSON.stringify({
    Title: body.title.trim(),
    Slug: body.title.trim().toLowerCase().replaceAll(' ', '-'),
    Content: body.content,
    Date: body.date,
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSONbody,
  });
};
