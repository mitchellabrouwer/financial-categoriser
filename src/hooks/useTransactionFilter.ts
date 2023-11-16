import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { filterTransactions } from "../lib/utilities/general";
import { CategorisedTransaction, Filters } from "../types/types";

interface UseTransactionFilterProps {
  initialFilters: Filters;
  allTransactions: CategorisedTransaction[];
  setTransactions: Dispatch<SetStateAction<CategorisedTransaction[]>>;
  onNoResultsFound: () => void;
}

function useTransactionFilter({
  allTransactions,
  initialFilters,
  setTransactions,
  onNoResultsFound,
}: UseTransactionFilterProps) {
  const [filters, setFilters] = useState(initialFilters);
  console.log(filters);

  useEffect(() => {
    const filtered = filterTransactions(allTransactions, filters);
    if (filtered.length > 0) {
      setTransactions(filtered);
    } else if (onNoResultsFound) {
      onNoResultsFound();
    }
  }, [filters, allTransactions, setTransactions, onNoResultsFound]);

  return { setFilters };
}

export default useTransactionFilter;
