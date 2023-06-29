import { GetServerSideProps } from "next";
import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useStaticHooks from "hooks/useStaticHooks";
import useCookies from "hooks/useCookies";
import useApiRequests from "hooks/useApiRequests";
import { ResponseMessages } from "components/admin/ResponseMessages";
import { EditorForm } from "components/admin/EditorForm";
import { S3Modal } from "components/admin/S3Modal";
import { FormBody, getBody } from "components/admin/FormBody";
import { eventDeletionResponseMessages, eventUpdateResponseMessages } from "components/admin/MessagesArrays";

interface Props {
  event: {
    title: string;
    content: string;
    date: string;
    id: string;
    imageUrl?: string;
    published: string;
  };
  token: string;
  s3ImageUrls: string[];
}

export const EditEvent = ({ event, token, s3ImageUrls }: Props) => {
  const [eventUpdateState, setEventUpdateState] = useState(0);
  const [eventDeleteState, setEventDeleteState] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formBody, setFormBody] = useState<FormBody>({
    title: event.title,
    content: event.content,
    imageUrl: event.imageUrl || "",
    date: event.date,
    published: event.published || "",
    imageFile: null,
  });
  const { genericRequest } = useApiRequests();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await genericRequest({ method: "put", path: `events/${event.id}`, body: getBody(formBody), token });
      setEventUpdateState(1);
    } catch (error) {
      console.error(error);
      setEventDeleteState(2);
    }
  };

  const handleDelete = async () => {
    const returnVal = confirm("Are you sure you want to delete?");
    if (returnVal) {
      try {
        await genericRequest({ method: "delete", path: `events/${event.id}`, token });
        setEventDeleteState(1);
      } catch (error) {
        console.error(error);
        setEventDeleteState(2);
      }
    }
  };

  if (eventDeleteState > 0)
    return <ResponseMessages messages={eventDeletionResponseMessages} state={eventDeleteState} />;

  return (
    <div>
      {modalIsOpen && <S3Modal s3ImageUrls={s3ImageUrls} setFormBody={setFormBody} setModalIsOpen={setModalIsOpen} />}
      <h1 className="text-3xl font-bold mb-10">Blog editor</h1>
      <EditorForm
        created={eventUpdateState === 1 || eventDeleteState === 1}
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
      <ResponseMessages messages={eventUpdateResponseMessages} state={eventUpdateState} />
    </div>
  );
};

export default EditEvent;

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
    const { data: event } = await getItemById("events", id);
    const s3ImageUrls = await getArrayFromS3Urls(token);

    return {
      props: {
        event,
        s3ImageUrls,
        token,
      },
    };
  } catch (error) {
    console.error(error);
    return redirect("500");
  }
};
