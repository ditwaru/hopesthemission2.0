import { mongoPutRequest, cloudinaryRequest } from 'lib/fetchRequests';

export const updateBlogApi = async (
  token: string,
  title: string,
  body: string,
  id: string,
  image?: File
) => {
  if (image) {
    return mongoPutRequest(
      token,
      title,
      body,
      id,
      'blogs',
      await cloudinaryRequest(image)
    );
  } else {
    return mongoPutRequest(token, title, body, id, 'blogs');
  }
};
