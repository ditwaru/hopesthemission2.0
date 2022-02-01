import { createNewPostApi } from 'pages/api/posts/createNewPostApi';
import { useState } from 'react';

const CreateBlog = ({ token }) => {
  const [createBlogWidget, setCreateBlogWidgetState] = useState(1);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // const [image, setImage] = useState(new File([''], ''));

  if (createBlogWidget > 0)
    return (
      <div>
        {createBlogWidget === 2 && (
          <div className="my-3 text-green-700 font-semibold">
            Post has been successfully created
          </div>
        )}
        <button
          className="border w-48 bg-blue-400 rounded-lg"
          onClick={() => setCreateBlogWidgetState(0)}
        >
          Create a new blog
        </button>
      </div>
    );
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await createNewPostApi(title, content, token, image);
        if (res !== 'error') setCreateBlogWidgetState(2);
      }}
      className="flex flex-col items-start space-y-2"
    >
      <label htmlFor="title">Title</label>
      <input
        className="border"
        type="text"
        name="title"
        id="title"
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label htmlFor="content">Content</label>
      <textarea
        className="border"
        name="content"
        id="content"
        cols={30}
        rows={5}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      {/* <label htmlFor="image">Image</label>
      <input
        type="file"
        name="image"
        id="image"
        onChange={(e) => {
          e.target.files && setImage(e.target.files[0]);
        }}
      /> */}
      <div className="flex space-x-2">
        <button className="border rounded-lg px-4 bg-green-400" type="submit">
          Create
        </button>
        <button
          className="border rounded-lg px-4 bg-gray-200"
          onClick={() => setCreateBlogWidgetState(1)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateBlog;
