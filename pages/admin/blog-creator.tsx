import { FormEvent, useState } from "react";
import { GetServerSideProps } from "next";
import useCookies from "hooks/useCookies";
import useApiRequests from "hooks/useApiRequests";
import useStaticHooks from "hooks/useStaticHooks";
import { S3Modal } from "components/admin/S3Modal";
import { EditorForm } from "components/admin/EditorForm";
import { FormBody, getBody } from "components/admin/FormBody";
import { ResponseMessages } from "components/admin/ResponseMessages";
import { blogCreationResponseMessages } from "components/admin/MessagesArrays";

const CreateBlog = ({ token, s3ImageUrls }: { token: string; s3ImageUrls: string[] }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [blogCreationState, setblogCreationState] = useState(0);
  const [formBody, setFormBody] = useState<FormBody>({
    title: "",
    content: "",
    imageUrl: "",
    date: "",
    published: "",
    imageFile: null,
  });

  const { genericRequest } = useApiRequests();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await genericRequest({
        method: "post",
        path: "blogs",
        body: getBody(formBody),
        token,
      });
      setblogCreationState(1);
    } catch (error) {
      console.error(error);
      setblogCreationState(2);
    }
  };

  return (
    <>
      {modalIsOpen && <S3Modal s3ImageUrls={s3ImageUrls} setFormBody={setFormBody} setModalIsOpen={setModalIsOpen} />}
      <h1 className="text-3xl font-bold my-10">Create a new blog</h1>
      <EditorForm
        created={blogCreationState === 1}
        handleSubmit={handleSubmit}
        formBody={formBody}
        setFormBody={setFormBody}
        setModalIsOpen={setModalIsOpen}
        disableS3Button={s3ImageUrls.length === 0}
      />
      <ResponseMessages messages={blogCreationResponseMessages} state={blogCreationState} />
    </>
  );
};

export default CreateBlog;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { getToken } = useCookies();
  const token = await getToken(req, res);
  const { redirectToLogin, redirect } = useStaticHooks();

  if (!token) {
    return redirectToLogin();
  }
  try {
    const BUCKET_NAME = process.env.NEXT_PUBLIC_BUCKET_NAME;

    const { genericRequest } = useApiRequests();
    const { data } = await genericRequest({ method: "get", path: "images", token });
    const s3ImageUrls = data?.map((key: string) => `https://${BUCKET_NAME}.s3.amazonaws.com/${key}`) || null;

    return {
      props: { token, s3ImageUrls },
    };
  } catch (err) {
    console.error(err);
    return redirect("500");
  }
};
