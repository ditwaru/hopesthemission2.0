import { GetServerSideProps } from "next";
import { ChangeEvent, FormEvent, useState } from "react";
import useCookies from "hooks/useCookies";
import useApiRequests from "hooks/useApiRequests";
import useStaticHooks from "hooks/useStaticHooks";
import { SubmitButton } from "components/common/SubmitButton";
import { ContentInput, SubmitButtons, TitleInput } from "components/admin/EditorInputs";
import { ResponseMessages } from "components/admin/ResponseMessages";
import { imageUploadResponseMessages, textUpdateResponseMessages } from "components/admin/MessagesArrays";
import { getBase64StringFromFile } from "components/admin/FormBody";
import { LoadingToSuccess } from "components/common/Icons";
import { IconStatuses } from "utils/types";

interface Props {
  currentTitle: string;
  currentContent: string;
  token: string;
}

export const EditAbout = ({ token, currentTitle, currentContent }: Props) => {
  const [textUpdateState, setTextUpdateState] = useState(0);
  const [imageUploadState, setImageUpdateState] = useState(0);
  const [formBody, setFormBody] = useState({ title: currentTitle || "", content: currentContent || "" });
  const [imageFiles, setImageFiles] = useState<FileList>();
  const [statusIcon, setStatusIcon] = useState(IconStatuses.OFF);
  const { genericRequest } = useApiRequests();

  const disableUploadImageButton = statusIcon !== IconStatuses.OFF || imageUploadState > 0 || !imageFiles;

  const imageInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImageFiles(files);
    }
  };

  const handleTextSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const body = { title: formBody.title, content: formBody.content };
      await genericRequest({ method: "put", path: "about", body, token });
      setTextUpdateState(1);
    } catch (error) {
      console.error(error);
      setTextUpdateState(2);
    }
  };

  const handleImagesSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body: { images: { imageFile: string; fileName: string; contentType: string }[] } = { images: [] };
    if (imageFiles) {
      for (let i = 0; i < imageFiles.length; i++) {
        const { name: fileName, type: contentType } = imageFiles[i];
        const imageFile = await getBase64StringFromFile(imageFiles[i]);
        body.images.push({ imageFile, fileName, contentType });
      }
      try {
        setStatusIcon(IconStatuses.LOADING);
        await genericRequest({ method: "post", path: "images/about", body, token });
        setStatusIcon(IconStatuses.SUCCESS);
        setImageUpdateState(1);
      } catch (err) {
        console.error(err);
        setStatusIcon(IconStatuses.ERROR);
        setImageUpdateState(2);
      }
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold my-10">About editor</h1>
      <form className="flex flex-col space-y-2" onSubmit={handleTextSubmit}>
        <TitleInput title={formBody.title} setFormBody={setFormBody} />
        <ContentInput content={formBody.content} setFormBody={setFormBody} />
        <SubmitButtons text="Update" created={textUpdateState > 0} />
      </form>
      <form className="mt-10 flex flex-col space-y-2" onSubmit={handleImagesSubmit}>
        <p>Upload images to the about page</p>
        <div className="flex items-center space-x-2">
          <input
            className={imageFiles && imageFiles.length > 1 ? "w-44" : ""}
            type="file"
            name="images"
            id="images"
            onChange={imageInputHandler}
            multiple
          />
          <LoadingToSuccess status={statusIcon} />
        </div>
        <ResponseMessages messages={imageUploadResponseMessages} state={imageUploadState} />
        <SubmitButton text="Upload" disabled={disableUploadImageButton} />
      </form>
      <ResponseMessages messages={textUpdateResponseMessages} state={textUpdateState} />
    </div>
  );
};

export default EditAbout;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { getToken } = useCookies();
  const { redirectToLogin, redirect } = useStaticHooks();
  const token = await getToken(req, res);

  if (!token) {
    return redirectToLogin();
  }

  try {
    const { getItemsByCategory } = useApiRequests();
    const { data } = await getItemsByCategory("about");

    const currentTitle = data.find(({ id }: { id: string }) => id === "title")?.title || null;
    const currentContent = data.find(({ id }: { id: string }) => id === "content")?.content || null;

    return { props: { token, currentTitle, currentContent } };
  } catch (error) {
    console.error(error);
    return redirect("500");
  }
};
