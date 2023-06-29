import { GetServerSideProps } from "next";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useStaticHooks from "hooks/useStaticHooks";
import useCookies from "hooks/useCookies";
import useApiRequests from "hooks/useApiRequests";

interface Props {
  event: {
    title: string;
    content: string;
    date: string;
    id: string;
    imageUrl?: string;
  };
  token: string;
}

export const EditEvent = ({ event, token }: Props) => {
  const [editPageState, setEditPageState] = useState(0);
  const [title, setTitle] = useState(event.title);
  const [content, setContent] = useState(event.content);
  const [date, setDate] = useState(new Date(+event.date).getTime().toString());
  const [image, setImage] = useState<File>();
  const { genericRequest } = useApiRequests();

  const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setImage(file);
    }
  };
  const handleUpdate = async () => {
    const getBody = () => {
      if (image) {
        const body = new FormData();
        body.append("title", title);
        body.append("content", content);
        body.append("date", date);
        body.append("image", image);
        return body;
      }

      const body = {
        title,
        content,
        date,
        imageUrl: event.imageUrl,
      };
      return body;
    };

    const res = await genericRequest({ method: "put", path: `events/${event.id}`, body: getBody(), token });

    res ? setEditPageState(3) : setEditPageState(4);
  };

  const handleDelete = async () => {
    const returnVal = confirm("Are you sure you want to delete?");
    if (returnVal) {
      const res = await genericRequest({ method: "delete", path: `events/${event.id}`, token });

      res ? setEditPageState(1) : setEditPageState(2);
    }
    return false;
  };

  if (editPageState === 0)
    return (
      <>
        <h1 className="text-3xl font-bold my-10">Event editor</h1>
        <form
          className="flex flex-col space-y-2"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex flex-col">
            <label htmlFor="title">Title</label>
            <input
              className="py-1 px-3 rounded-lg border"
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              className="py-1 px-3 rounded-lg border"
              value={new Date(+date).toISOString().split("T")[0]}
              onChange={(e) => {
                const [year, month, day] = e.target.value.split("-");
                setDate(new Date(+year, +month - 1, +day).getTime().toString());
              }}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="content">Content</label>
            <textarea
              className="p-3 rounded-lg border"
              name="content"
              id=""
              cols={30}
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            {event.imageUrl && (
              <>
                <label htmlFor="image">Current Image</label>
                <Image src={event.imageUrl} height="150" width="250" />
              </>
            )}
            <input className={event.imageUrl ? "mt-2" : ""} type="file" name="image" id="image" onChange={uploadFile} />
          </div>
          <div className="flex space-x-3">
            <button className="rounded-lg bg-teal-200 py-1 px-3" onClick={handleUpdate}>
              Update
            </button>
            <Link href="/admin">
              <a className="rounded-lg bg-gray-200 py-1 px-3">Cancel</a>
            </Link>
            <button className="rounded-lg bg-red-200 py-1 px-3" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </form>
      </>
    );
  if (editPageState > 0) {
    const states = [
      "",
      "The event has successfully been deleted",
      "An error occurred while deleting",
      "The event has been successfully updated",
      "An error occurred while updating",
    ];
    return (
      <div>
        <p className="text-green-700 mb-5">{states[editPageState]}</p>
        <Link href="/admin">
          <a className="rounded-lg bg-gray-200 py-1 px-3">Go back</a>
        </Link>
      </div>
    );
  }
};

export default EditEvent;

export const getServerSideProps: GetServerSideProps = async ({ query, req, res }) => {
  const { getToken } = useCookies();
  const { redirect, redirectToLogin } = useStaticHooks();
  const token = await getToken(req, res);
  if (!token) {
    return redirectToLogin();
  }
  const id = query.id as string;
  try {
    const { getItemById } = useApiRequests();
    const { data: event } = await getItemById("events", id);

    return {
      props: {
        event,
        token,
      },
    };
  } catch (error) {
    console.error(error);
    return redirect("500");
  }
};
