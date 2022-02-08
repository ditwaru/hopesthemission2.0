export const cloudinaryRequest = async (image: File) => {
  const data = new FormData();
  data.append('file', image);
  data.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_PRESET || '');
  const sendData = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: 'POST', body: data }
  );
  const res = await sendData.json();
  return res.url;
};

export const mongoPostRequest = async (
  token: string,
  title: string,
  content: string,
  endpoint: string,
  imageURL?: string
) => {
  const data = {
    title: title.trim(),
    body: content.trim(),
  };
  if (imageURL) {
    Object.assign(data, {
      imageURL,
    });
  }
  const body = JSON.stringify(data);
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body,
  });

  if (res.status === 201) {
    return res.json();
  }
  return 'error';
};

export const mongoPutRequest = async (
  token: string,
  title: string,
  body: string,
  id: string,
  endpoint: string,
  imageURL?: string
) => {
  const data = { title, body, id };
  if (imageURL) {
    Object.assign(data, { imageURL });
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.status;
};
