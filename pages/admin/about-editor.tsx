import { GetServerSideProps } from "next";
import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import useCookies from "hooks/useCookies";
import useApiRequests from "hooks/useApiRequests";
import useStaticHooks from "hooks/useStaticHooks";
import { SubmitButton } from "components/common/SubmitButton";

interface Props {
  currentTitle: string;
  currentContent: string;
  bannerImages: string[];

  token: string;
}

export const EditAbout = ({ token, currentTitle, currentContent }: Props) => {
  const [editPageState, setEditPageState] = useState(0);
  const [title, setTitle] = useState(currentTitle);
  const [content, setContent] = useState(currentContent);
  const [imageFiles, setImageFiles] = useState<FileList>();
  const [uploadSuccessful, setUploadSuccessful] = useState(false);
  const { genericRequest } = useApiRequests();

  const updateAboutPage = async () => {
    const body = {
      title,
      content,
    };
    return genericRequest({ method: "put", path: "about", body, token });
  };

  const uploadAboutImages = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImageFiles(files);
    }
  };

  const handleSubmitAboutImages = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = new FormData();
    if (imageFiles) {
      for (let i = 0; i < imageFiles.length; i++) {
        body.append("image" + i, imageFiles[i]);
      }
      try {
        const { status } = await genericRequest({ method: "post", path: "images/about", body, token });
        setUploadSuccessful(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (editPageState === 0)
    return (
      <div>
        <h1 className="text-3xl font-bold my-10">About editor</h1>
        <form
          className="flex flex-col space-y-2"
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await updateAboutPage();
            res ? setEditPageState(1) : setEditPageState(2);
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
        <form className="mt-10 flex flex-col space-y-2" onSubmit={handleSubmitAboutImages}>
          <p>Upload images to the about page</p>
          <input type="file" name="images" id="images" onChange={uploadAboutImages} multiple />
          <SubmitButton text="Upload" disabled={uploadSuccessful} />
        </form>
      </div>
    );
  if (editPageState > 0) {
    const states = ["", "The about page has successfully been updated", "An error occurred while updating"];
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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const url = process.env.NEXT_PUBLIC_SERVER_URL;
  const { getToken } = useCookies();
  const { redirectToLogin, redirect } = useStaticHooks();
  const token = await getToken(req, res);

  if (!token) {
    return redirectToLogin();
  }

  try {
    const { getItemsByCategory } = useApiRequests();
    const { data } = await getItemsByCategory("about");

    const currentTitle = data.find(({ id }: { id: string }) => id === "title")?.title || null;
    const currentContent = data.find(({ id }: { id: string }) => id === "content")?.content || null;
    const bannerImages =
      data.reduce((acc: string[], { imageUrl }: { imageUrl: string }) => {
        if (imageUrl) {
          acc.push(imageUrl);
        }
        return acc;
      }, []) || null;

    return { props: { token, currentTitle, currentContent, bannerImages } };
  } catch (error) {
    console.error(error);
    return redirect("500");
  }
};
