import {
  CategorisedTransaction,
  CategoryCounts,
  MonthlyCategoryTotals,
} from "../types/types";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import SummaryTable from "./SummaryTable";
import TransactionTable from "./TransactionTable";

interface ChartsLargeScreenProps {
  transactions: CategorisedTransaction[];
  categoriesByMonth: MonthlyCategoryTotals;
  categoryCount: CategoryCounts;
  allTransactions: CategorisedTransaction[];
  setTransactions: React.Dispatch<
    React.SetStateAction<CategorisedTransaction[]>
  >;
}

function ChartsLargeScreen({
  transactions,
  categoriesByMonth,
  categoryCount,
  allTransactions,
  setTransactions,
}: ChartsLargeScreenProps) {
  return (
    <div className="m-auto hidden max-w-7xl md:block">
      <div className="flex h-[50vh]">
        <div className="w-1/2">
          <div className="h-[20vh]">
            <PieChart transactions={transactions} />
          </div>
          <div className="h-[30vh]">
            <BarChart transactionsByMonth={categoriesByMonth} />
          </div>
        </div>
        <div className="w-1/2">
          <SummaryTable
            categoryByMonth={categoriesByMonth}
            counts={categoryCount}
          />
        </div>
      </div>
      <div className="mt-5 h-[30vh]">
        <TransactionTable
          transactions={transactions}
          allTransactions={allTransactions || []}
          setTransactions={setTransactions}
        />
      </div>
    </div>
  );
}

export default ChartsLargeScreen;
