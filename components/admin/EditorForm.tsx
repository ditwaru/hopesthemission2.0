import { ChangeEvent, FormEvent, useState } from "react";
import { ContentInput, DateInput, ImageInputs, SubmitButtons, TitleInput } from "./EditorInputs";
import useApiRequests from "hooks/useApiRequests";

interface Props {
  token: string;
  imageFile: File | null;
  selectedS3Image: string;
  created: boolean;
  setCreated: Function;
  setImageFile: Function;
  setSelectedS3Image: Function;
  setModalIsOpen: Function;
  disableS3Button: boolean;
  date?: string;
  setDate?: Function;
}
export const EditorForm = ({
  imageFile,
  selectedS3Image,
  token,
  created,
  setCreated,
  setImageFile,
  setSelectedS3Image,
  setModalIsOpen,
  disableS3Button,
  date,
  setDate,
}: Props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { genericRequest } = useApiRequests();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const getBody = () => {
      if (imageFile) {
        const body = new FormData();
        body.append("title", title);
        body.append("content", content);
        body.append("image", imageFile as File);
        return body;
      }
      const body = { title, content };
      if (selectedS3Image.length) {
        Object.assign(body, {
          imageUrl: selectedS3Image,
        });
      }
      return body;
    };

    const res = await genericRequest({
      method: "post",
      path: "blogs",
      body: getBody(),
      token,
    });
    if (res) setCreated(true);
  };

  const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setImageFile(file);
      setSelectedS3Image("");
    }
  };

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <TitleInput setTitle={setTitle} />
      {date?.length && <DateInput date={date} setDate={setDate as Function} />}
      <ContentInput setContent={setContent} />
      <ImageInputs
        imageFile={imageFile}
        selectedS3Image={selectedS3Image}
        setImageFile={setImageFile}
        setModalIsOpen={setModalIsOpen}
        setSelectedS3Image={setSelectedS3Image}
        disableS3Button={disableS3Button}
        uploadFile={uploadFile}
      />
      <SubmitButtons created={created} />
    </form>
  );
};
