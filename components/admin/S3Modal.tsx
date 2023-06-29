import { Modal } from "components/common/Modal";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { FormBody } from "./FormBody";

interface Props {
  setModalIsOpen: Function;
  s3ImageUrls: string[];
  setFormBody: Dispatch<SetStateAction<FormBody>>;
}
export const S3Modal = ({ setModalIsOpen, s3ImageUrls, setFormBody }: Props) => {
  const [highlightedImage, setHighlightedImage] = useState("");
  const handleS3ImageApply = () => {
    setModalIsOpen(false);
    setFormBody((state) => ({ ...state, imageFile: null, imageUrl: highlightedImage }));
  };
  return (
    <Modal header="Select an image" closeModal={setModalIsOpen}>
      <div className="my-4">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 overflow-auto max-h-96">
          {s3ImageUrls.map((url) => (
            <div
              key={url}
              className={`${
                highlightedImage === url && "border-8 border-blue-400"
              } w-24 h-24 sm:w-28 sm:h-28 relative hover:cursor-pointer`}
              onClick={() => {
                setHighlightedImage(url);
              }}
            >
              <Image src={url} layout="fill" objectFit="fill" />
            </div>
          ))}
        </div>
      </div>
      <button
        className="bg-teal-200 hover:bg-teal-300 px-3 border border-teal-400 rounded-lg"
        onClick={handleS3ImageApply}
      >
        apply
      </button>
    </Modal>
  );
};
