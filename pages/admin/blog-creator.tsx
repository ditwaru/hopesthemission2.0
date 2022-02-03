import { createNewPostApi } from 'pages/api/posts/createNewPostApi';
import { useState } from 'react';
import Link from 'next/link';
import { GetServerSideProps } from 'next';

const CreateBlog = ({ token }) => {
  const [blogCreated, setBlogCreated] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<FormData>();

  const uploadFile = (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append('file', file);
    setImage(data);
  };
  return (
    <>
      <h1 className="text-3xl font-bold my-10">Create a new blog</h1>
      {blogCreated && (
        <div className="my-3 text-green-700 font-semibold">
          Post has been successfully created
        </div>
      )}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const res = await createNewPostApi(title, content, token, image);
          if (res !== 'error') {
            setBlogCreated(true);
          }
        }}
        className="flex flex-col items-start space-y-2"
      >
        <div className="flex flex-col w-full">
          <label htmlFor="title">Title</label>
          <input
            className="py-1 px-3 rounded-lg border w-full"
            type="text"
            name="title"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="content">Content</label>
          <textarea
            className="p-3 rounded-lg border"
            name="content"
            id="content"
            cols={30}
            rows={5}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <label htmlFor="image">Image</label>
        <input type="file" name="image" id="image" onChange={uploadFile} />
        <div className="flex space-x-2">
          <button className="rounded-lg bg-teal-200 py-1 px-3" type="submit">
            Create
          </button>
          <Link href="/admin">
            <a className="rounded-lg bg-gray-200 py-1 px-3">Cancel</a>
          </Link>
        </div>
      </form>
    </>
  );
};

export default CreateBlog;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: { token: req.cookies.token || '' },
  };
};
