import { NextPage, GetServerSideProps } from 'next';
import { useState } from 'react';
import { filterOldEvents } from 'lib/filterOldEvents';
import { LoginForm } from 'components/LoginForm';

import { CreateBlog } from 'components/Blogs/CreateBlog';
import { EditBlog } from 'components/Blogs/EditBlog';
import { CreateEvent } from 'components/Events/CreateEvent';
import { EditEvent } from 'components/Events/EditEvent';

import Link from 'next/link';

export const AdminPage: NextPage = ({ token, posts, events }) => {
  const [tokenState, setTokenState] = useState(token || '');
  if (tokenState) {
    return (
      <div className="flex flex-col space-y-5 mt-5 w-full max-w-lg p-5 items-center">
        <Link href="/admin/blogs/create">
          <a className="border rounded-lg p-2 my-3 bg-white filter shadow-lg hover:scale-110 transition-all duration-300 w-full">
            Create Blog
          </a>
        </Link>
        <Link href="/admin/blogs/edit">
          <a className="border rounded-lg p-2 my-3 bg-white filter shadow-lg hover:scale-110 transition-all duration-300 w-full">
            Edit Blog
          </a>
        </Link>
        <Link href="/admin/events/create">
          <a className="border rounded-lg p-2 my-3 bg-white filter shadow-lg hover:scale-110 transition-all duration-300 w-full">
            Create Event
          </a>
        </Link>
        <Link href="/admin/events/edit">
          <a className="border rounded-lg p-2 my-3 bg-white filter shadow-lg hover:scale-110 transition-all duration-300 w-full">
            Edit Event
          </a>
        </Link>
        {/* <CreateBlog token={token} />
        <EditBlog posts={posts} />
        <CreateEvent token={token} />
        <EditEvent events={events} /> */}
      </div>
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
  const filteredEvents = filterOldEvents(events);

  return {
    props: { token: req.cookies.token || '', posts, events: filteredEvents },
  };
};
