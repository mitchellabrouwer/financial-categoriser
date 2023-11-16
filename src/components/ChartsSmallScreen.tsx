import React, { useState } from "react";
import {
  CategorisedTransaction,
  CategoryCounts,
  MonthlyCategoryTotals,
} from "../types/types";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import SummaryTable from "./SummaryTable";
import TransactionTable from "./TransactionTable";

interface ChartsSmallScreenProps {
  transactions: CategorisedTransaction[];
  categoriesByMonth: MonthlyCategoryTotals;
  categoryCount: CategoryCounts;
  allTransactions: CategorisedTransaction[];
  setTransactions: React.Dispatch<
    React.SetStateAction<CategorisedTransaction[]>
  >;
}

function ChartsSmallScreen({
  transactions,
  categoriesByMonth,
  categoryCount,
  allTransactions,
  setTransactions,
}: ChartsSmallScreenProps) {
  const [tableView, setTableView] = useState<"transaction" | "summary">(
    "transaction",
  );

  return (
    <div className="md:hidden">
      <div className="flex h-[15vh]">
        <PieChart transactions={transactions} />
      </div>
      <div className="h-[25vh]">
        <BarChart transactionsByMonth={categoriesByMonth} />
      </div>
      <div className="text-center">
        <button
          type="button"
          className={`-mb-14 mr-2 rounded-lg rounded-b-none border border-gray-300  px-5 py-1.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:text-white ${
            tableView === "transaction"
              ? "bg-dining hover:bg-housing"
              : "bg-white hover:bg-dining dark:bg-gray-800 dark:hover:border-gray-600"
          }`}
          onClick={() => setTableView("transaction")}
        >
          Transactions
        </button>
        <button
          type="button"
          className={`-mb-14 mr-2 rounded-lg rounded-b-none border border-gray-300  px-5 py-1.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:text-white ${
            tableView === "summary"
              ? "bg-dining hover:bg-housing"
              : "bg-white hover:bg-dining dark:bg-gray-800 dark:hover:border-gray-600"
          }`}
          onClick={() => setTableView("summary")}
        >
          Summary
        </button>
      </div>
      {tableView === "transaction" && (
        <div className="h-[25vh]">
          <TransactionTable
            transactions={transactions}
            allTransactions={allTransactions || []}
            setTransactions={setTransactions}
          />
        </div>
      )}
      {tableView === "summary" && (
        <div className="h-[35vh]">
          <SummaryTable
            categoryByMonth={categoriesByMonth}
            counts={categoryCount}
          />
        </div>
      )}
    </div>
  );
}

export default ChartsSmallScreen;
