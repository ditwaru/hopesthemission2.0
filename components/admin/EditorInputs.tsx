import { SubmitButton } from "components/common/SubmitButton";
import Image from "next/image";
import Link from "next/link";
import { FormBody } from "./FormBody";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
interface ImageInputProps {
  disableS3Button: boolean;
  formBody: FormBody;
  setFormBody: Dispatch<SetStateAction<any>>;
  setModalIsOpen: Function;
}

export const TitleInput = ({ title, setFormBody }: { title: string; setFormBody: ImageInputProps["setFormBody"] }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="title">Title</label>
      <input
        className="py-1 px-3 rounded-lg border"
        type="text"
        name="title"
        id="title"
        value={title}
        onChange={(e) => setFormBody((state: any) => ({ ...state, title: e.target.value }))}
        required
      />
    </div>
  );
};

export const ContentInput = ({
  created,
  content,
  setFormBody,
}: {
  created?: boolean;
  content: string;
  setFormBody: ImageInputProps["setFormBody"];
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="content">Content</label>
      <textarea
        className="p-3 rounded-lg border"
        name="content"
        id="content"
        value={content}
        cols={30}
        rows={created ? 3 : 10}
        onChange={(e) => setFormBody((state: FormBody): FormBody => ({ ...state, content: e.target.value }))}
        required
      />
    </div>
  );
};

export const DateInput = ({ date, setDate }: { date: string; setDate: Function }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="date">Date</label>
      <input
        type="date"
        name="date"
        id="date"
        className="py-1 px-3 rounded-lg border"
        value={new Date(+date).toISOString().split("T")[0]}
        onChange={(e) => {
          const [year, month, day] = e.target.value.split("-");
          setDate(new Date(+year, +month - 1, +day).getTime().toString());
        }}
        required
      />
    </div>
  );
};

export const ImageInputs = ({ setModalIsOpen, formBody, setFormBody, disableS3Button }: ImageInputProps) => {
  const { imageUrl, imageFile } = formBody;
  const fileInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFormBody(
        (state: FormBody): FormBody => ({
          ...state,
          imageFile: file,
          imageUrl: "",
        })
      );
    }
  };
  return (
    <>
      <input
        className={`${imageUrl.length || imageFile === null ? "w-[6.5rem]" : "w-56"}`}
        type="file"
        name="image"
        id="image"
        onChange={fileInputHandler}
      />
      <button
        type="button"
        className={`w-44 bg-gray-200 hover:bg-gray-300 py-1 px-3 border border-slate-400 rounded-lg ${
          disableS3Button && "opacity-50 pointer-events-none"
        }`}
        onClick={() => setModalIsOpen(true)}
      >
        Use image from S3
      </button>
      {imageUrl.length > 0 && (
        <div className="relative h-32 w-32">
          <Image src={imageUrl} layout="fill" objectFit="fill" />
          <button
            onClick={() => {
              setFormBody((state: FormBody) => ({ ...state, imageUrl: "" }));
            }}
            className="absolute top-0 right-0 text-3xl text-pink-600"
          >
            &times;
          </button>
        </div>
      )}
      {!imageUrl && imageFile && (
        <div className="flex items-center space-x-3">
          <p>Using new image to upload</p>
          <button
            onClick={() => {
              setFormBody((state: FormBody) => ({ ...state, imageFile: null }));
            }}
            className="text-3xl text-pink-600"
          >
            &times;
          </button>
        </div>
      )}
    </>
  );
};

export const SubmitButtons = ({ text, created }: { text?: string; created: boolean }) => {
  return (
    <div className="flex space-x-2">
      <SubmitButton text={text || "Create"} disabled={created} />
      {!created && (
        <Link href="/admin">
          <a className="rounded-lg bg-gray-200 hover:bg-gray-300 py-1 px-3">Cancel</a>
        </Link>
      )}
    </div>
  );
};
