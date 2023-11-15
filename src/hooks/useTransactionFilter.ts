import { useState, useEffect } from "react";
import { CategorisedTransaction, Filters } from "../types/types";

const useTransactionFilter = (allTransactions, initialFilters) => {
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    // Implement the filter logic here
    // You can use the existing filterTransactions function
    const filtered = filterTransactions(allTransactions, filters);
    setFilteredTransactions(filtered);
  }, [filters, allTransactions]);

  return { filteredTransactions, setFilters };
};
