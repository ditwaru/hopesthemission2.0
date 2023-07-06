import { Dispatch, FormEvent, ReactNode, SetStateAction } from "react";
import { ContentInput, ImageInputs, SubmitButtons, TitleInput } from "./EditorInputs";
import { FormBody } from "components/admin/FormBody";
interface Props {
  setModalIsOpen: Function;
  disableS3Button: boolean;
  created: boolean;
  formBody: FormBody;
  createButtonText?: string;
  setFormBody: Dispatch<SetStateAction<FormBody>>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => {};
  children?: ReactNode;
}
export const EditorForm = ({
  created,
  setModalIsOpen,
  disableS3Button,
  formBody,
  handleSubmit,
  setFormBody,
  createButtonText,
  children,
}: Props) => {
  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <TitleInput title={formBody.title} setFormBody={setFormBody} />
      {children}
      <ContentInput created={created} content={formBody.content} setFormBody={setFormBody} />
      <ImageInputs
        formBody={formBody}
        setFormBody={setFormBody}
        setModalIsOpen={setModalIsOpen}
        disableS3Button={disableS3Button}
      />
      <SubmitButtons text={createButtonText} created={created} />
    </form>
  );
};
