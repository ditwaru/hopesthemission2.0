export const createNewPostApi = async (
  title: string,
  content,
  token,
  image
) => {
  const Slug = title.toLowerCase().trim().replaceAll(' ', '-');
  const data = new FormData();
  data.append('file', image);

  const body = JSON.stringify({
    Title: title.trim(),
    Content: content.trim(),
    Slug,
    Image: data,
  });
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body,
  });
  if (res.status === 200) {
    return res.json();
  }
  return 'error';
};

// todo left off thinking of I should consolidate the create/delete/update APIs into one
