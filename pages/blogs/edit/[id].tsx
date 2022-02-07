import { GetServerSideProps, NextPage } from 'next';
import { deletePostApi } from 'pages/api/posts/deletePostApi';
import { updatePostApi } from 'pages/api/posts/updatePostApi';
import { useState } from 'react';
import Link from 'next/link';

export const EditPost: NextPage = ({ post, token }) => {
  const [editPageState, setEditPageState] = useState(0);
  const [title, setTitle] = useState(post.Title);
  const [content, setContent] = useState(post.Content);

  if (editPageState === 0)
    return (
      <>
        <h1 className="text-3xl font-bold my-10">Blog editor</h1>
        <form
          className="flex flex-col space-y-2"
          onSubmit={(e) => e.preventDefault()}
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
            <button
              className="rounded-lg bg-teal-200 py-1 px-3"
              onClick={async () => {
                const httpStatus = await updatePostApi(post.id, token, {
                  Title: title,
                  Content: content,
                });
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
                  const httpStatus = await deletePostApi(post.id, token);
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
      'The post has successfully been deleted',
      'An error occurred while deleting',
      'The post has been successfully updated',
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

export default EditPost;

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const { id } = query;
  const url = process.env.NEXT_PUBLIC_SERVER_URL;
  const response = await fetch(`${url}/posts/${id}`);
  const post = await response.json();

  return { props: { token: req.cookies.token, post } };
};
