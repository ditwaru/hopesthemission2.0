import { GetServerSideProps } from "next";
import { useState } from "react";

import useApiRequests from "hooks/useApiRequests";
import useCookies from "hooks/useCookies";
import useStaticHooks from "hooks/useStaticHooks";
import { S3Modal } from "components/admin/S3Modal";
import { EditorForm } from "components/admin/EditorForm";

const CreateEvent = ({ token, s3ImageUrls }: { token: string; s3ImageUrls: string[] }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedS3Image, setSelectedS3Image] = useState("");
  const [date, setDate] = useState(new Date().getTime().toString());
  const [created, setCreated] = useState(false);

  return (
    <>
      {modalIsOpen && (
        <S3Modal
          s3ImageUrls={s3ImageUrls}
          setImageFile={setImageFile}
          setModalIsOpen={setModalIsOpen}
          setSelectedS3Image={setSelectedS3Image}
        />
      )}
      <h1 className="text-3xl font-bold my-10">Create a new Event</h1>
      <EditorForm
        created={created}
        imageFile={imageFile}
        selectedS3Image={selectedS3Image}
        setCreated={setCreated}
        setImageFile={setImageFile}
        setModalIsOpen={setModalIsOpen}
        setSelectedS3Image={setSelectedS3Image}
        date={date}
        setDate={setDate}
        token={token}
      />
      {created && <div className="my-3 text-green-700 font-semibold">Event has been successfully created</div>}
    </>
  );
};

export default CreateEvent;

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
