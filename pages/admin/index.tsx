import { NextPage, GetServerSideProps } from 'next';
import { useState } from 'react';
import { filterOldEvents } from 'lib/filterOldEvents';
import { LoginForm } from 'components/LoginForm';

import Link from 'next/link';

export const AdminPage: NextPage = ({ token, events }) => {
  const [tokenState, setTokenState] = useState(token || '');
  if (tokenState) {
    return (
      <>
        <h1 className="text-3xl font-bold my-10">Admin Dashboard</h1>
        <div className="flex flex-col space-y-5 w-full max-w-lg items-center">
          <Link href="/admin/blog-creator">
            <a className="border rounded-lg p-2 bg-white filter shadow-lg hover:scale-110 transition-all duration-300 w-full">
              Create Blog
            </a>
          </Link>
          <Link href="/admin/blogs">
            <a className="border rounded-lg p-2 bg-white filter shadow-lg hover:scale-110 transition-all duration-300 w-full">
              Edit Blog
            </a>
          </Link>
          <Link href="/admin/event-creator">
            <a className="border rounded-lg p-2 bg-white filter shadow-lg hover:scale-110 transition-all duration-300 w-full">
              Create Event
            </a>
          </Link>
          <Link href="/admin/events">
            <a
              className={`${
                events.length === 0 && 'pointer-events-none opacity-50'
              } border rounded-lg p-2 bg-white filter shadow-lg hover:scale-110 transition-all duration-300 w-full`}
            >
              Edit Event
            </a>
          </Link>
        </div>
      </>
    );
  }

  return <LoginForm setTokenState={setTokenState} />;
};

export default AdminPage;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const url = process.env.NEXT_PUBLIC_STRAPI_URL;
  const postsResponse = await fetch(`${url}/posts`);
  const posts = await postsResponse.json();

  const eventsResponse = await fetch(`${url}/events`);
  const events = await eventsResponse.json();
  const filteredEvents = filterOldEvents(new Date(), events);

  return {
    props: { token: req.cookies.token || '', posts, events: filteredEvents },
  };
};
