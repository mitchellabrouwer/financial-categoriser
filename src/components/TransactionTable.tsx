/* eslint-disable react/no-unstable-nested-components */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useScrollbarSize from "react-scrollbar-size";
import Select, { MultiValue, SingleValue } from "react-select";
import { toast } from "react-toastify";
import { AutoSizer, List } from "react-virtualized";
import { colours } from "../../styles/colours";
import { categoryList } from "../data/categoryList";
import useModal from "../hooks/useModal";
import useTransactionFilter from "../hooks/useTransactionFilter";
import useTransactionSearch from "../hooks/useTransactionSearch";
import {
  categoryOptions,
  countUnknown,
  toTwClass,
} from "../lib/utilities/general";
import loadFuse from "../lib/utilities/loadFuse";
import { CategorisedTransaction, Option } from "../types/types";
import CategoryListModal from "./CategoryListModal";
import MultiSelect, { ColourOption } from "./MultiSelect";
import Search from "./Search";
import TransactionRow from "./TransactionRow";

const monthOptions: Option[] = [
  { value: "", label: "All" },
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const colourOptions: ColourOption[] = [
  ...categoryList.map((category) => {
    return {
      value: category,
      label: category,
      color: colours.backgroundColor[toTwClass(category)],
    };
  }),
];

const amountOptions = [
  { value: "", label: "All" },
  { value: "0,100", label: "Up to $100" },
  { value: "101,500", label: "$101 to $500" },
  { value: "501,1000", label: "$501 to $1,000" },
  { value: "1001,5000", label: "$1,001 to $5,000" },
  { value: "5001,10000", label: "$5,001 to $10,000" },
  { value: "10001,50000", label: "$10,001 to $50,000" },
  { value: "50001,", label: "Above $50,001" },
];

export default function TransactionTable({
  transactions,
  allTransactions,
  setTransactions,
}: {
  transactions: CategorisedTransaction[];
  allTransactions: CategorisedTransaction[];
  setTransactions: React.Dispatch<
    React.SetStateAction<CategorisedTransaction[]>
  >;
}) {
  const [unknowns, setUnknowns] = useState<number>(0);
  const searchRef = useRef<HTMLInputElement>(null);

  const fuse = useMemo(() => loadFuse(allTransactions), [allTransactions]);
  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => a.amount - b.amount);
  }, [transactions]);

  const { isShowing, toggle } = useModal();
  const { width: widthScrollBar } = useScrollbarSize();
  const { setQuery } = useTransactionSearch({
    allTransactions,
    setTransactions,
    fuse,
  });

  const onNoResultsFound = useCallback(() => {
    toast.error("No transactions found", { position: "bottom-center" });
  }, []);

  const { setFilters } = useTransactionFilter({
    initialFilters: { amount: "", month: "", categories: [] },
    allTransactions,
    setTransactions,
    onNoResultsFound,
  });

  useEffect(() => {
    const count = countUnknown(transactions);
    setUnknowns(count);
  }, [transactions]);

  const handleChangeCategory = useCallback(
    (index: number, newCategory: SingleValue<Option>, description: string) => {
      if (!newCategory) return;

      const relatedMatches = fuse
        .search(description)
        .map((result) => result.item.id);

      const updatedTransactions = transactions.map((transaction, idx) => {
        if (relatedMatches.includes(transaction.id) || idx === index) {
          return { ...transaction, category: newCategory.value };
        }
        return transaction;
      });

      const toastMessage =
        relatedMatches.length > 1
          ? `${relatedMatches.length} related transactions updated`
          : `${relatedMatches.length} transaction updated`;

      toast.success(toastMessage, {
        position: "bottom-right",
      });

      setTransactions(updatedTransactions);
    },
    [fuse, setTransactions, transactions],
  );

  const handleMonthFilter = (selection: SingleValue<Option>) => {
    setFilters((filters) => ({
      ...filters,
      month: selection ? selection.value : "",
    }));
  };

  const handleAmountFilter = (selection: SingleValue<Option>) => {
    setFilters((filters) => ({
      ...filters,
      amount: selection ? selection.value : "",
    }));
  };

  const handleCategoryFilters = (
    selectedCategoryOptions: MultiValue<ColourOption>,
  ) => {
    setFilters((filters) => ({
      ...filters,
      categories: selectedCategoryOptions
        ? selectedCategoryOptions.map((option) => option.value)
        : [],
    }));
  };

  // const rowRenderer = useCallback(
  // ({ index, key, style }: ListRowProps) => {
  //   const transaction = sortedTransactions[index];
  //   return (
  //     <TransactionRow
  //       key={key}
  //       index={index}
  //       style={style}
  //       transaction={transaction}
  //       categoryOptions={categoryOptions}
  //       handleChangeCategory={handleChangeCategory}
  //     />
  //   );
  // },
  //   [sortedTransactions, handleChangeCategory],
  // );

  return (
    <div className="relative mx-2 my-2 flex h-full flex-col shadow-md sm:rounded-lg">
      {/* Flexbox used over <table> due to responsivity issues when using react-virtualized */}

      <div className="flex rounded-tl-lg rounded-tr-lg bg-gray-50 p-1 text-sm uppercase text-gray-500 dark:bg-gray-700">
        <div className="hidden w-[150px] flex-shrink-0 text-center sm:block">
          Date
        </div>
        <div className="flex-grow text-center">Description</div>
        <div className="w-[100px] flex-shrink-0 text-center md:w-[150px]">
          Amount
        </div>
        <div className="w-[140px] flex-shrink-0 text-center md:w-[180px]">
          Category
          <span
            role="button"
            tabIndex={0}
            onClick={toggle}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                toggle();
              }
            }}
            className="ml-2 mr-2 rounded-full border border-red-800 bg-red-100 px-4 py-1 text-xs font-medium text-red-800 hover:cursor-pointer hover:border-red-900 hover:bg-red-200 dark:border-red-300 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
          >
            {unknowns}
          </span>
          <CategoryListModal
            isShowing={isShowing}
            toggle={toggle}
            unknowns={unknowns}
          />
        </div>
      </div>

      <div className="flex items-center border-b-2 bg-gray-50 text-gray-500">
        <div className="hidden w-[150px] flex-shrink-0 sm:block">
          <Select
            menuPosition="fixed"
            options={monthOptions}
            onChange={handleMonthFilter}
          />
        </div>
        <div className="flex-grow">
          <Search searchRef={searchRef} setQuery={setQuery} />
        </div>
        <div className="w-[100px] flex-shrink-0 md:w-[150px]">
          <Select
            menuPosition="fixed"
            options={amountOptions}
            onChange={handleAmountFilter}
          />
        </div>
        <div
          className="w-[140px] flex-shrink-0 md:w-[180px]"
          style={{ marginRight: widthScrollBar }}
        >
          <MultiSelect
            options={colourOptions}
            onChangeHandler={handleCategoryFilters}
          />
        </div>
      </div>

      <AutoSizer>
        {({ width, height }) => (
          <List
            width={width}
            height={height}
            rowCount={sortedTransactions.length}
            rowHeight={37}
            rowRenderer={({ index, key, style }) => {
              const transaction = sortedTransactions[index];
              return (
                <TransactionRow
                  key={key}
                  index={index}
                  style={style}
                  transaction={transaction}
                  categoryOptions={categoryOptions}
                  handleChangeCategory={handleChangeCategory}
                />
              );
            }}
          />
        )}
      </AutoSizer>
    </div>
  );
}
