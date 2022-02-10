import { GetServerSideProps, NextPage } from 'next';
import { deleteBlogApi } from 'pages/api/blogs/deleteBlogApi';
import { updateBlogApi } from 'pages/api/blogs/updateBlogApi';
import { ChangeEvent, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  blog: {
    title: string;
    body: string;
    id: string;
    imageURL: string;
  };
  token: string;
}

export const EditBlog = ({ blog, token }: Props) => {
  const [editPageState, setEditPageState] = useState(0);
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.body);
  const [image, setImage] = useState<File>();
  const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setImage(file);
    }
  };

  if (editPageState === 0)
    return (
      <div>
        <h1 className="text-3xl font-bold mb-10">Blog editor</h1>
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
            {blog.imageURL && (
              <Image src={blog.imageURL} height="150" width="250" />
            )}
            <input
              className={blog.imageURL ? 'mt-2' : ''}
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
                const httpStatus = await updateBlogApi(
                  token,
                  title,
                  content,
                  blog.id,
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
                  const httpStatus = await deleteBlogApi(blog.id, token);
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
      </div>
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

export default EditBlog;

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const { slug } = query;
  const url = process.env.NEXT_PUBLIC_SERVER_URL;
  const response = await fetch(`${url}/blogs/${slug}`);
  const blog = await response.json();

  return { props: { token: req.cookies.token, blog: blog[0] } };
};
