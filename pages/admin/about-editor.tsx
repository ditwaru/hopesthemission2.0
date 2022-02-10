import { GetServerSideProps, NextPage } from 'next';
import { updateAboutApi } from 'pages/api/about/updateAboutApi';
import { useState } from 'react';
import Link from 'next/link';

interface Props {
  about: {
    title: string;
    body: string;
  };
  token: string;
}

export const EditAbout = ({ about, token }: Props) => {
  const [editPageState, setEditPageState] = useState(0);
  const [title, setTitle] = useState(about.title);
  const [content, setContent] = useState(about.body);

  if (editPageState === 0)
    return (
      <div>
        <h1 className="text-3xl font-bold my-10">About editor</h1>
        <form
          className="flex flex-col space-y-2"
          onSubmit={async (e) => {
            e.preventDefault();
            const httpStatus = await updateAboutApi(token, {
              title,
              body: content,
            });
            httpStatus === 200 ? setEditPageState(1) : setEditPageState(2);
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
          <div className="flex space-x-3">
            <button className="rounded-lg bg-teal-200 py-1 px-3" type="submit">
              Update
            </button>
            <Link href="/admin">
              <a className="rounded-lg bg-gray-200 py-1 px-3">Cancel</a>
            </Link>
          </div>
        </form>
      </div>
    );
  if (editPageState > 0) {
    const states = [
      '',
      'The about page has successfully been updated',
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

export default EditAbout;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const url = process.env.NEXT_PUBLIC_SERVER_URL;
  const response = await fetch(`${url}/about`);
  const about = await response.json();
  const token = req?.cookies?.token || null;

  return { props: { token, about: about[0] } };
};
