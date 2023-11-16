import Fuse from "fuse.js";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { filterAndSearchTransactions } from "../lib/utilities/general";
import { CategorisedTransaction, Filters } from "../types/types";
import useDebounce from "./useDebounceHook";

interface UseTransactionFilterProps {
  initialFilters: Filters;
  allTransactions: CategorisedTransaction[];
  setTransactions: Dispatch<SetStateAction<CategorisedTransaction[]>>;
  searchQuery?: string;
  fuse: Fuse<CategorisedTransaction>;
  onNoResultsFound: () => void;
}

function useTransactionFilterAndSearch({
  allTransactions,
  initialFilters,
  setTransactions,
  fuse,
  onNoResultsFound,
}: UseTransactionFilterProps) {
  const [filters, setFilters] = useState(initialFilters);
  const previousFilters = useRef<Filters>(initialFilters);

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce<string>(query, 500);

  useEffect(() => {
    const filtered = filterAndSearchTransactions({
      allTransactions,
      query: debouncedQuery,
      filters,
      fuse,
    });

    if (filtered.length > 0) {
      previousFilters.current = filters;
      setTransactions(filtered);
    } else {
      onNoResultsFound();
      setFilters(previousFilters.current);
      setQuery("");
    }
  }, [
    filters,
    allTransactions,
    setTransactions,
    onNoResultsFound,
    debouncedQuery,
    fuse,
  ]);

  return { filters, setFilters, setQuery };
}

export default useTransactionFilterAndSearch;
