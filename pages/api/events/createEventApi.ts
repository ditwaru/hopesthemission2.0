import { cloudinaryRequest, mongoPostRequest } from 'lib/fetchRequests';

export const createEventApi = async (
  token: string,
  title: string,
  content: string,
  date: string,
  image: File | undefined
) => {
  let imageURL: string;
  const data = {
    title,
    body: content,
    date,
  };
  if (image) {
    imageURL = await cloudinaryRequest(image);
    Object.assign(data, { imageURL });
  }

  const body = JSON.stringify(data);

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body,
  });

  return res;
};
