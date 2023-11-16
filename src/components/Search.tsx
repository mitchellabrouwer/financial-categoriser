import { Dispatch, KeyboardEvent, RefObject, SetStateAction } from "react";
import { BiSearch } from "react-icons/bi";

interface SearchProps {
  setQuery: Dispatch<SetStateAction<string>>;
  searchRef: RefObject<HTMLInputElement>;
}

function Search({ setQuery, searchRef }: SearchProps) {
  const onSearchEnter = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setQuery(searchRef.current?.value || "");
    }
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex w-full flex-wrap items-center pl-3 pt-[0.5px]">
        <BiSearch color="grey" />
      </div>
      <input
        ref={searchRef}
        type="search"
        id="search"
        className="text-md block w-full rounded-md  border py-[6px] pl-8 capitalize text-gray-950 focus:border-blue-500 focus:ring-blue-500"
        placeholder="find..."
        onChange={(event) => setQuery(event.target.value)}
        onKeyUp={onSearchEnter}
      />
    </div>
  );
}

export default Search;
