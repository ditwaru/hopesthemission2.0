import { cloudinaryRequest, mongoPostRequest } from 'lib/fetchRequests';

export const createNewBlogApi = async (
  title: string,
  content: string,
  token: string,
  image: File | undefined
) => {
  // send image to cloudinary
  if (image) {
    return mongoPostRequest(
      token,
      title,
      content,
      'blogs',
      await cloudinaryRequest(image)
    );
  } else {
    return mongoPostRequest(token, title, content, 'blogs');
  }
};
