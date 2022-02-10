import { cloudinaryRequest, mongoPutRequest } from 'lib/fetchRequests';

export const updateEventApi = async (
  token: string,
  title: string,
  body: string,
  date: string,
  id: string,
  image?: File
) => {
  if (image) {
    return mongoPutRequest(
      token,
      title,
      body,
      id,
      'events',
      await cloudinaryRequest(image)
    );
  } else {
    return mongoPutRequest(token, title, body, id, 'events');
  }
};
