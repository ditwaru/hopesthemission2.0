import { GetServerSideProps } from "next";
import { ChangeEvent, FormEvent, useState } from "react";
import useStaticHooks from "hooks/useStaticHooks";
import useApiRequests from "hooks/useApiRequests";
import useCookies from "hooks/useCookies";
import { ResponseMessages } from "components/admin/ResponseMessages";
import { blogUpdateResponseMessages, blogDeletionResponseMessages } from "components/admin/MessagesArrays";
import { FormBody, getBody } from "components/admin/FormBody";
import { EditorForm } from "components/admin/EditorForm";
import { S3Modal } from "components/admin/S3Modal";

interface Props {
  blog: {
    title: string;
    content: string;
    imageUrl?: string;
    id: string;
    published: string;
  };
  s3ImageUrls: string[];
  token: string;
}

export const EditBlog = ({ blog, token, s3ImageUrls }: Props) => {
  const [blogUpdateState, setBlogUpdateState] = useState(0);
  const [blogDeleteState, setBlogDeleteState] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formBody, setFormBody] = useState<FormBody>({
    title: blog.title,
    content: blog.content,
    imageUrl: blog.imageUrl || "",
    date: "",
    published: blog.published,
    imageFile: null,
  });
  const { genericRequest } = useApiRequests();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = await getBody(formBody);
    try {
      await genericRequest({ method: "put", path: `blogs/${blog.id}`, body, token });
      setBlogUpdateState(1);
    } catch (error) {
      console.error(error);
      setBlogUpdateState(2);
    }
  };

  const handleDelete = async () => {
    const returnVal = confirm("Are you sure you want to delete?");
    if (returnVal) {
      try {
        await genericRequest({ method: "delete", path: `blogs/${blog.id}`, token });
        setBlogDeleteState(1);
      } catch (err) {
        console.error(err);
        setBlogDeleteState(2);
      }
    }
    return false;
  };

  if (blogDeleteState > 0) return <ResponseMessages messages={blogDeletionResponseMessages} state={blogDeleteState} />;

  return (
    <div>
      {modalIsOpen && <S3Modal s3ImageUrls={s3ImageUrls} setFormBody={setFormBody} setModalIsOpen={setModalIsOpen} />}
      <h1 className="text-3xl font-bold mb-10">Blog editor</h1>
      <EditorForm
        created={blogUpdateState === 1 || blogDeleteState === 1}
        handleSubmit={handleSubmit}
        formBody={formBody}
        setFormBody={setFormBody}
        setModalIsOpen={setModalIsOpen}
        disableS3Button={s3ImageUrls.length === 0}
        createButtonText="Update"
      />
      <button className="rounded-lg bg-red-200 py-1 px-3 mt-2 mb-5 w-full hover:bg-red-300" onClick={handleDelete}>
        Delete
      </button>
      <ResponseMessages messages={blogUpdateResponseMessages} state={blogUpdateState} />
    </div>
  );
};

export default EditBlog;

export const getServerSideProps: GetServerSideProps = async ({ query, req, res }) => {
  const { getToken } = useCookies();
  const { redirect, redirectToLogin, getArrayFromS3Urls } = useStaticHooks();
  const token = await getToken(req, res);
  if (!token) {
    return redirectToLogin();
  }
  const id = query.id as string;
  try {
    const { getItemById } = useApiRequests();
    const { data: blog } = await getItemById("blogs", id);
    const s3ImageUrls = await getArrayFromS3Urls(token);

    return {
      props: {
        blog,
        s3ImageUrls,
        token,
      },
    };
  } catch (error) {
    console.error(error);
    return redirect("500");
  }
};
