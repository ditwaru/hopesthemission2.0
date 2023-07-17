import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  contents: {}[];
  amount: number;
  setPostIndex: Dispatch<SetStateAction<number>>;
}

export const AdminPagination = ({ contents, amount, setPostIndex }: Props) => {
  const [pageIndex, setPageIndex] = useState(1);
  const totalContent: number = contents.length;
  const highestPageNumber = totalContent < amount ? 1 : Math.ceil(totalContent / amount);

  const pagination = Array.from({ length: highestPageNumber }, (bruh, i) => i + 1);
  const pageClickHandler = (i: number) => {
    setPostIndex(amount * i - amount); // 0 indexed
    setPageIndex(i); // 1 indexed
  };

  return (
    <nav className="flex justify-between">
      <button
        className={`ml-5 ${pageIndex === 1 ? "opacity-50 point-events-none" : ""}`}
        onClick={() => {
          pageIndex > 1 && pageClickHandler(pageIndex - 1);
        }}
      >
        &lt;
      </button>
      {pagination.map((i) => (
        <button
          key={i}
          onClick={() => pageClickHandler(i)}
          className={pageIndex === i ? "underline text-blue-500 text-xl" : ""}
        >
          {i}
        </button>
      ))}
      <button
        className={`mr-5 ${pageIndex === highestPageNumber ? "opacity-50 point-events-none" : ""}`}
        onClick={() => {
          pageIndex < highestPageNumber && pageClickHandler(pageIndex + 1);
        }}
      >
        &gt;
      </button>
    </nav>
  );
};
