import { filterOldEvents } from 'lib/filterOldEvents';
import { GetServerSideProps, NextPage } from 'next';
import { createEventApi } from 'pages/api/events/createEventApi';
import { useState } from 'react';
import Link from 'next/link';

const CreateEvent: NextPage = ({ token }) => {
  const [eventCreated, setEventCreated] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  return (
    <>
      <h1 className="text-3xl font-bold my-10">Create a new event</h1>
      {eventCreated && (
        <div className="my-3 text-green-700 font-semibold">
          Event has been successfully created
        </div>
      )}
      <form
        className="flex flex-col space-y-3"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-col">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="py-1 px-3 rounded-lg border"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
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
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            id="content"
            cols={30}
            rows={10}
            className="p-3 rounded-lg border"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="flex space-x-3">
          <button
            className="rounded-lg bg-teal-200 py-1 px-3"
            onClick={async () => {
              await createEventApi(token, { title, content, date });
              return setEventCreated(true);
            }}
          >
            Create Event
          </button>
          <Link href="/admin">
            <a className="rounded-lg bg-gray-200 py-1 px-3">Cancel</a>
          </Link>
        </div>
      </form>
    </>
  );
};

export default CreateEvent;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const url = process.env.NEXT_PUBLIC_STRAPI_URL;

  const eventsResponse = await fetch(`${url}/events`);
  const events = await eventsResponse.json();
  const filteredEvents = filterOldEvents(new Date(), events);

  return {
    props: { token: req.cookies.token || '', events: filteredEvents },
  };
};
