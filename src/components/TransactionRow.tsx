import React from "react";
import Select, { SingleValue, StylesConfig } from "react-select";
import { formatCurrency, toTwClass } from "../lib/utilities/general";
import { CategorisedTransaction, Option } from "../types/types";

interface TransactionRowProps {
  transaction: CategorisedTransaction;
  index: number;
  categoryOptions: Option[];
  handleChangeCategory: (
    index: number,
    newCategory: SingleValue<Option>,
    description: string,
  ) => void;
  style: React.CSSProperties;
}

const customSelectStyles: StylesConfig<Option, false> = {
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    color: isSelected ? "white" : isFocused ? "black" : "gray",
  }),
  singleValue: (styles) => ({
    ...styles,
    color: "gray",
  }),

  control: (styles) => ({
    ...styles,
    height: "35px",
    minHeight: "35px",
    alignItems: "flex-start",
  }),
  menu: (styles) => ({
    ...styles,
    marginTop: 0,
  }),
};

const TransactionRow: React.FC<TransactionRowProps> = React.memo(
  ({ transaction, index, categoryOptions, handleChangeCategory, style }) => {
    return (
      <div
        style={style}
        className={`mr-5 flex items-center text-center text-gray-400 ${
          index % 2 === 0 ? "bg-gray-50" : "bg-white"
        }`}
      >
        <div className="hidden w-[150px] flex-shrink-0 sm:block">
          {transaction.date}
        </div>
        <div className="flex-grow truncate pl-1 text-left">
          {transaction.description}
        </div>
        <div className="w-[100px] flex-shrink-0 md:w-[150px]">
          {formatCurrency(transaction.amount)}
        </div>
        <div className="w-[140px] flex-shrink-0 md:w-[180px]">
          <div
            className={`rounded-md p-[0.9px] shadow-md ${toTwClass(
              transaction.category,
              "bg-",
            )}`}
          >
            <Select<Option>
              // menuPosition="fixed"
              // menuPlacement="bottom"
              styles={customSelectStyles}
              menuPortalTarget={document.body}
              options={categoryOptions.sort()}
              value={
                {
                  value: transaction.category,
                  label: transaction.category,
                } as Option
              }
              onChange={(newCategory) => {
                handleChangeCategory(
                  index,
                  newCategory,
                  transaction.description,
                );
              }}
            />
          </div>
        </div>
      </div>
    );
  },
);

TransactionRow.displayName = "TransactionRow";

export default TransactionRow;
