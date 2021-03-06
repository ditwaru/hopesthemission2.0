import { NextPage, GetServerSideProps } from 'next';
import { useState } from 'react';
import { LoginForm } from 'components/LoginForm';
import Link from 'next/link';
import { logoutApi } from 'pages/api/logoutApi';
import { useRouter } from 'next/router';

interface Props {
  token: string;
  events: [];
  blogs: [];
}

export const AdminPage: NextPage<Props> = ({ token, events, blogs }) => {
  const [tokenState, setTokenState] = useState(token || '');

  const router = useRouter();
  if (tokenState) {
    return (
      <>
        <h1 className="text-3xl font-bold my-10 text-center">
          Admin Dashboard
        </h1>
        <div className="absolute top-16 right-5 flex-col flex">
          <button
            onClick={async () => {
              await logoutApi();
              router.reload();
            }}
          >
            Log Out
          </button>
          <button>Account settings</button>
        </div>
        <div className="flex flex-col space-y-5">
          <Link href="/admin/about-editor">
            <a className="border rounded-lg p-2 bg-white filter shadow-lg md:hover:scale-110 transition-all duration-300">
              Edit About Page
            </a>
          </Link>
          <Link href="/admin/blog-creator">
            <a className="border rounded-lg p-2 bg-white filter shadow-lg md:hover:scale-110 transition-all duration-300">
              Create Blog
            </a>
          </Link>
          <Link href="/admin/blogs">
            <a
              className={`border rounded-lg p-2 bg-white filter shadow-lg md:hover:scale-110 transition-all duration-300 ${
                blogs.length === 0 && 'pointer-events-none opacity-50'
              }`}
            >
              Edit Blog
            </a>
          </Link>
          <Link href="/admin/event-creator">
            <a className="border rounded-lg p-2 bg-white filter shadow-lg md:hover:scale-110 transition-all duration-300">
              Create Event
            </a>
          </Link>
          <Link href="/admin/events">
            <a
              className={`${
                events.length === 0 && 'pointer-events-none opacity-50'
              } border rounded-lg p-2 bg-white filter shadow-lg md:hover:scale-110 transition-all duration-300`}
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
  const url = process.env.NEXT_PUBLIC_SERVER_URL;
  const blogsResponse = await fetch(`${url}/blogs`);
  const blogs = await blogsResponse.json();

  const eventsResponse = await fetch(`${url}/events`);
  const events = await eventsResponse.json();

  return {
    props: { token: req.cookies.token || '', blogs, events },
  };
};
