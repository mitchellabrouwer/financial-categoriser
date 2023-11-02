import { Dispatch, FC, SetStateAction } from "react";
import { generateSampleTransactions } from "../data/sampleData";
import { aggregateByMonth } from "../lib/transactions/aggregateByMonth";
import { countByCategory } from "../lib/transactions/countByCategory";
import { ActiveView, CategorisedTransaction } from "../types/types";

interface SampleDataProps {
  setTransactions: Dispatch<SetStateAction<CategorisedTransaction[]>>;
  setAllTransactions: Dispatch<SetStateAction<CategorisedTransaction[]>>;
  setActiveView: Dispatch<SetStateAction<ActiveView>>;
}

export const SampleDataButton: FC<SampleDataProps> = ({
  setTransactions,
  setActiveView,
  setAllTransactions,
}) => {
  return (
    <button
      onClick={() => {
        const sampleTransactions = generateSampleTransactions(100);
        const categoriesByMonth = aggregateByMonth(sampleTransactions);
        const categoryCount = countByCategory(sampleTransactions);

        setTransactions(sampleTransactions);
        setAllTransactions(sampleTransactions);

        setActiveView("charts");
      }}
      className="m-1 w-full max-w-xs rounded bg-dining px-4 py-2 text-center font-bold text-white"
    >
      Try with sample data
    </button>
  );
};
