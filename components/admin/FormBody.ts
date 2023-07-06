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

export const getBase64StringFromFile = async (file: File) => {
  const buffer = await file.arrayBuffer();
  return Buffer.from(buffer).toString("base64");
};

const getJSONBody = async (formBody: { [key: string]: string } & { imageFile: File }) => {
  const body = Object.keys(formBody).reduce((acc, key) => {
    if (key === "imageFile") return acc;
    Object.assign(acc, {
      [key]: formBody[key],
    });
    return acc;
  }, {});

  if (formBody.imageFile != null) {
    const imageFile = formBody.imageFile;
    const fileName = imageFile.name;
    const contentType = imageFile.type;
    Object.assign(body, {
      ...body,
      imageFile: await getBase64StringFromFile(formBody.imageFile),
      fileName,
      contentType,
    });
  }
  return body;
};

export const getBody = async (formBody: FormBody) => {
  return await getJSONBody(formBody as unknown as { [key: string]: string } & { imageFile: File });
};
