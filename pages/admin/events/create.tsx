import { filterOldEvents } from 'lib/filterOldEvents';
import { GetServerSideProps, NextPage } from 'next';
import { createEventApi } from 'pages/api/events/createEventApi';
import { useState } from 'react';

const CreateEvent: NextPage = ({ token }) => {
  const [createEventWidgetState, setCreateEventWidgetState] = useState(1);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [image, setImage] = useState();

  if (createEventWidgetState > 0) {
    return (
      <div>
        {createEventWidgetState === 2 && (
          <div className="my-3 text-green-700 font-semibold">
            Event has been successfully created
          </div>
        )}
        <button
          onClick={() => setCreateEventWidgetState(0)}
          className="border w-48 bg-blue-400 rounded-lg"
        >
          Create Event
        </button>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col space-y-3"
      onSubmit={(e) => e.preventDefault()}
    >
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        name="title"
        className="border"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label htmlFor="date">Date</label>
      <input
        type="date"
        name="date"
        id="date"
        className="border"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <label htmlFor="content">Content</label>
      <textarea
        name="content"
        id="content"
        cols={30}
        rows={10}
        className="border"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <div className="flex space-x-3">
        <button
          className="border rounded-lg px-2 bg-green-300"
          onClick={() => {
            createEventApi(token, { title, content, date });
            setCreateEventWidgetState(2);
          }}
        >
          Create Event
        </button>
        <button
          className="border rounded-lg px-4 bg-gray-200"
          onClick={() => setCreateEventWidgetState(1)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateEvent;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const url = process.env.NEXT_PUBLIC_STRAPI_URL;

  const eventsResponse = await fetch(`${url}/events`);
  const events = await eventsResponse.json();
  const filteredEvents = filterOldEvents(events);

  return {
    props: { token: req.cookies.token || '', events: filteredEvents },
  };
};
