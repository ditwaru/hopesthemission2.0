import { GetServerSideProps } from 'next';
import { deleteEventApi } from 'pages/api/events/deleteEventApi';
import { updateEventApi } from 'pages/api/events/updateEventApi';
import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  event: {
    title: string;
    body: string;
    date: string;
    id: string;
    imageURL?: string;
  };
  token: string;
}

export const EditEvent = ({ event, token }: Props) => {
  const [editPageState, setEditPageState] = useState(0);
  const [title, setTitle] = useState(event.title);
  const [content, setContent] = useState(event.body);
  const [date, setDate] = useState(event.date.split('T')[0]);
  const [image, setImage] = useState<File>();
  const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setImage(file);
    }
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
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
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
            <label htmlFor="image">Current Image</label>
            {event.imageURL && (
              <Image src={event.imageURL} height="150" width="250" />
            )}
            <input
              className={event.imageURL ? 'mt-2' : ''}
              type="file"
              name="image"
              id="image"
              onChange={uploadFile}
            />
          </div>
          <div className="flex space-x-3">
            <button
              className="rounded-lg bg-teal-200 py-1 px-3"
              onClick={async () => {
                const httpStatus = await updateEventApi(
                  token,
                  title,
                  content,
                  date,
                  event.id,
                  image
                );
                httpStatus === 200 ? setEditPageState(3) : setEditPageState(4);
              }}
            >
              Update
            </button>
            <Link href="/admin">
              <a className="rounded-lg bg-gray-200 py-1 px-3">Cancel</a>
            </Link>
            <button
              className="rounded-lg bg-red-200 py-1 px-3"
              onClick={async () => {
                const returnVal = confirm('Are you sure you want to delete?');
                if (returnVal) {
                  const httpStatus = await deleteEventApi(event.id, token);
                  httpStatus === 200
                    ? setEditPageState(1)
                    : setEditPageState(2);
                }
                return false;
              }}
            >
              Delete
            </button>
          </div>
        </form>
      </>
    );
  if (editPageState > 0) {
    const states = [
      '',
      'The event has successfully been deleted',
      'An error occurred while deleting',
      'The event has been successfully updated',
      'An error occurred while updating',
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

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const { id } = query;
  const url = process.env.NEXT_PUBLIC_SERVER_URL;
  const response = await fetch(`${url}/events/${id}`);
  const event = await response.json();

  return { props: { token: req.cookies.token, event } };
};
