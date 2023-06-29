import { ReactNode } from "react";

interface Props {
  header: string;
  children: ReactNode;
  closeModal: Function;
}
export const Modal = ({ header, closeModal, children }: Props) => {
  return (
    <>
      <div onClick={() => closeModal(false)} className="fixed top-0 left-0 w-screen h-screen bg-black opacity-50"></div>
      <div className="absolute z-10 top-1/6 left-1/2 transform -translate-x-1/2 w-11/12 max-w-screen-lg bg-white rounded-lg px-8 py-5">
        <div className="flex justify-between">
          <p>{header}</p>
          <button
            onClick={() => closeModal(false)}
            className="text-3xl text-pink-600 transform -translate-y-3 translate-x-4"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </>
  );
};
