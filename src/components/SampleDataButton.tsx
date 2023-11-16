import { Dispatch, SetStateAction } from "react";
import generateSampleTransactions from "../data/sampleData";
import { ActiveView, CategorisedTransaction } from "../types/types";

interface SampleDataProps {
  setTransactions: Dispatch<SetStateAction<CategorisedTransaction[]>>;
  setAllTransactions: Dispatch<SetStateAction<CategorisedTransaction[]>>;
  setActiveView: Dispatch<SetStateAction<ActiveView>>;
}

function SampleDataButton({
  setTransactions,
  setActiveView,
  setAllTransactions,
}: SampleDataProps) {
  return (
    <button
      type="button"
      onClick={() => {
        const sampleTransactions = generateSampleTransactions(100);
        // const categoriesByMonth = aggregateByMonth(sampleTransactions);
        // const categoryCount = countByCategory(sampleTransactions);

        setTransactions(sampleTransactions);
        setAllTransactions(sampleTransactions);

        setActiveView("charts");
      }}
      className="m-1 w-full max-w-xs rounded bg-automotive px-4 py-2 text-center font-bold text-white"
    >
      Try with sample data
    </button>
  );
}

export default SampleDataButton;
