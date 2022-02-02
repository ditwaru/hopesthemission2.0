export const Search = ({ searchText, setSearchText }) => {
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
        className="ml-1 rounded-lg bg-gray-200 py-1 px-3 hover:scale-110 transition-all duration-300"
        onClick={() => setSearchText('')}
      >
        Clear
      </button>
    </div>
  );
};
