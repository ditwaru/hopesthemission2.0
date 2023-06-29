export interface FormBody {
  title: string;
  content: string;
  imageUrl: string;
  date: string;
  published: string;
  imageFile: File | null;
}

const getMultipartBody = (formBody: { [key: string]: string }) => {
  const body = new FormData();

  Object.keys(formBody).forEach((property) => {
    if (property === "imageFile") return;
    if (formBody[property].length) body.append(property, formBody[property]);
  });

  body.append("image", formBody.imageFile as unknown as File);
  return body;
};

const getJSONBody = (formBody: { [key: string]: string }) => {
  const body = Object.keys(formBody).reduce((acc, key) => {
    if (key === "imageFile") return acc;
    if (formBody[key].length) {
      Object.assign(acc, {
        [key]: formBody[key],
      });
    }
    return acc;
  }, {});
  return body;
};

export const getBody = (formBody: FormBody) => {
  if (formBody.imageFile) return getMultipartBody(formBody as unknown as { [key: string]: string });

  return getJSONBody(formBody as unknown as { [key: string]: string });
};
