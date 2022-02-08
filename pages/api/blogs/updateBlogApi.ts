import { mongoPutRequest, cloudinaryRequest } from 'lib/fetchRequests';

export const updateBlogApi = async (
  token: string,
  title: string,
  body: string,
  id: string,
  image: Blob
) => {
  if (image) {
    mongoPutRequest(
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
