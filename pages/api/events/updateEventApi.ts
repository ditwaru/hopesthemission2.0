import { cloudinaryRequest, mongoPutRequest } from 'lib/fetchRequests';

export const updateEventApi = async (
  token: string,
  title: string,
  content: string,
  date: number,
  id: string,
  image: File | undefined
) => {
  let imageURL: string;
  const data = {
    title,
    body: content,
    date,
    id,
  };
  if (image) {
    imageURL = await cloudinaryRequest(image);
    Object.assign(data, { imageURL });
  }

  const body = JSON.stringify(data);

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/events`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body,
  });

  return res.status;
};
