import { Dispatch, SetStateAction } from 'react';

interface Props {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
}

export const Search = ({ searchText, setSearchText }: Props) => {
  return (
    <div>
      <input
        className="py-1 px-3 rounded-lg border"
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search"
      />
      <button
        className="ml-1 rounded-lg bg-gray-200 py-1 px-3 md:hover:scale-110 transition-all duration-300"
        onClick={() => setSearchText('')}
      >
        Clear
      </button>
    </div>
  );
};
