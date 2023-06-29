import { SubmitButton } from "components/common/SubmitButton";
import Image from "next/image";
import Link from "next/link";
interface ImageInputProps {
  selectedS3Image: string;
  imageFile: File | null;
  disableS3Button: boolean;
  uploadFile: Function;
  setModalIsOpen: Function;
  setSelectedS3Image: Function;
  setImageFile: Function;
}

export const TitleInput = ({ setTitle }: { setTitle: Function }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="title">Title</label>
      <input
        className="py-1 px-3 rounded-lg border"
        type="text"
        name="title"
        id="title"
        onChange={(e) => setTitle(e.target.value)}
        required
      />
    </div>
  );
};

export const ContentInput = ({ setContent }: { setContent: Function }) => {
  return (
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

export const ImageInputs = ({
  selectedS3Image,
  imageFile,
  uploadFile,
  setModalIsOpen,
  setSelectedS3Image,
  setImageFile,
  disableS3Button,
}: ImageInputProps) => {
  return (
    <>
      <input
        className={`${selectedS3Image.length || imageFile === null ? "w-[6.5rem]" : "w-56"}`}
        type="file"
        name="image"
        id="image"
        onChange={(e) => uploadFile(e)}
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
      {selectedS3Image && (
        <div className="relative h-32 w-32">
          <Image src={selectedS3Image} layout="fill" objectFit="fill" />
          <button
            onClick={() => {
              setSelectedS3Image("");
            }}
            className="absolute top-0 right-0 text-3xl text-pink-600"
          >
            &times;
          </button>
        </div>
      )}
      {!selectedS3Image && imageFile && (
        <div className="flex items-center space-x-3">
          <p>Using new image to upload</p>
          <button
            onClick={() => {
              setImageFile(null);
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

export const SubmitButtons = ({ created }: { created: boolean }) => {
  return (
    <div className="flex space-x-2">
      <SubmitButton text="Create" disabled={created} />
      <Link href="/admin">
        <a className="rounded-lg bg-gray-200 hover:bg-gray-300 py-1 px-3">{created ? "Go back" : "Cancel"}</a>
      </Link>
    </div>
  );
};
