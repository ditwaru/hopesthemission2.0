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
      <form
        className="flex flex-col space-y-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor="title">Title</label>
        <input
          className="border"
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="content">Content</label>
        <textarea
          className="border"
          name="content"
          id=""
          cols={30}
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex space-x-3">
          <button
            className="border"
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
            <a className="border">Cancel</a>
          </Link>
          <button
            className="border"
            onClick={async () => {
              const returnVal = confirm('Are you sure you want to delete?');
              if (returnVal) {
                const httpStatus = await deletePostApi(post.id, token);
                httpStatus === 200 ? setEditPageState(1) : setEditPageState(2);
              }
              return false;
            }}
          >
            Delete
          </button>
        </div>
      </form>
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
        <p className="text-green-700">{states[editPageState]}</p>
        <Link href="/admin">
          <a className="border">Go back</a>
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
  const url = process.env.NEXT_PUBLIC_STRAPI_URL;
  const response = await fetch(`${url}/posts/${id}`);
  const post = await response.json();

  return { props: { token: req.cookies.token, post } };
};
