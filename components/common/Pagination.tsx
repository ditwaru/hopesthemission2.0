import Link from "next/link";

interface Props {
  type: string;
  pageNumbers: number;
  currentPage: number;
}

export const Pagination = ({ type, pageNumbers, currentPage }: Props) => {
  return (
    <nav className="flex justify-between mx-5">
      <Link href={`/${type}/page/${currentPage - 1}`}>
        <a className={currentPage === 1 ? `pointer-events-none opacity-50` : ""}>&lt;</a>
      </Link>

      {Array.from({ length: pageNumbers }, (bruh, i) => i + 1).map((pageNumber) => (
        <Link key={pageNumber} href={`/${type}/page/${pageNumber}`}>
          <a className={currentPage === pageNumber ? "underline text-blue-500 text-xl" : ""}>{pageNumber}</a>
        </Link>
      ))}

      <Link href={`/${type}/page/${currentPage + 1}`}>
        <a className={currentPage === pageNumbers ? `pointer-events-none opacity-50` : ""}>&gt;</a>
      </Link>
    </nav>
  );
};
