import Papa from "papaparse";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import parseTransactions from "../lib/transactions/parse";
import { areHeadersValid } from "../lib/utilities/general";
import {
  CategorisedTransaction,
  CategoryCounts,
  MonthlyCategoryTotals,
  Transaction,
} from "../types/types";

function useTransactionProcessing() {
  const workerRef = useRef<Worker>();
  const [progressLoader, setProgressLoader] = useState(0);
  const [categoriserType, setCategoriserType] = useState<"keyword" | "ai">(
    "keyword",
  );
  const [transactions, setTransactions] = useState<CategorisedTransaction[]>(
    [],
  );
  const [allTransactions, setAllTransactions] = useState<
    CategorisedTransaction[]
  >([]);

  const [categoriesByMonth, setCategoriesByMonth] =
    useState<MonthlyCategoryTotals>({});
  const [categoryCount, setCategoryCount] = useState<CategoryCounts>({});

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../workers/categorising.ts", import.meta.url),
    );

    workerRef.current.onmessage = (
      event: MessageEvent<{
        transactions?: CategorisedTransaction[];
        categoriesByMonth: MonthlyCategoryTotals;
        categoryCount: CategoryCounts;
        progress?: number;
      }>,
    ) => {
      if (event.data.progress) {
        setProgressLoader(Math.round(event.data.progress));
      }

      if (event.data.transactions) {
        setTransactions(event.data.transactions);
        setAllTransactions(event.data.transactions);
      }

      if (event.data.categoriesByMonth) {
        setCategoriesByMonth(event.data.categoriesByMonth);
      }
      if (event.data.categoryCount) {
        setCategoryCount(event.data.categoryCount);
      }
    };
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const processFile = (file: File) => {
    setIsLoading(true);
    setProgressLoader(0);
    Papa.parse<Transaction>(file, {
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        const headers = result.meta.fields;

        // TODO: check here if already categorised
        if (headers && !areHeadersValid(headers)) {
          toast.error("Headers are not in the format, please try again.", {
            position: "top-center",
          });
          setIsLoading(false);

          return;
        }

        const parsedTransactions = parseTransactions(result);

        workerRef?.current?.postMessage({
          transactions: parsedTransactions,
          categoriserType,
        });
      },
      error: () => {
        setIsLoading(false);
        toast.error("Something went wrong :-( error parsing CSV", {
          position: "top-center",
        });
      },
    });
  };

  return {
    isLoading,
    setIsLoading,
    progressLoader,
    categoriserType,
    setCategoriserType,
    transactions,
    setTransactions,
    allTransactions,
    setAllTransactions,
    processFile,
    categoriesByMonth,
    categoryCount,
    setCategoriesByMonth,
    setCategoryCount,
  };
}

export default useTransactionProcessing;
