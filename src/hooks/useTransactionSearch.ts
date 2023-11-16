import { useState, useMemo, Dispatch, SetStateAction } from "react";
import Fuse from "fuse.js";
import { CategorisedTransaction } from "../types/types";
import useDebounce from "./useDebounceHook";

interface UseTransactionFilterProps {
  allTransactions: CategorisedTransaction[];
  setTransactions: Dispatch<SetStateAction<CategorisedTransaction[]>>;
  fuse: Fuse<CategorisedTransaction>;
}

function useTransactionSearch({
  allTransactions,
  setTransactions,
  fuse,
}: UseTransactionFilterProps) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce<string>(query, 500);

  useMemo(() => {
    const results = debouncedQuery
      ? fuse.search(debouncedQuery).map((result) => result.item)
      : allTransactions;
    setTransactions(results);
  }, [debouncedQuery, fuse, allTransactions, setTransactions]);

  return { query, setQuery };
}

export default useTransactionSearch;
