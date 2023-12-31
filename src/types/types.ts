import { MultiValue } from "react-select";
import { ColourOption } from "../components/MultiSelect";

export type Transaction = {
  date: string;
  description: string;
  credit: string;
  debit: string;
  balance: string;
};

export type ParsedTransaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
};

export type CategorisedTransaction = ParsedTransaction & {
  category?: string;
};

export interface AggregateTransactions {
  total: {
    count: number;
    sum: number;
  };
  data: Tally;
}

export interface Tally {
  [key: string]: { sum: number; count: number };
}

export interface MonthlyCategoryTotals {
  [key: string]: { [key: string]: number };
}

export interface MonthlyCategory {
  date: string;
  categories: { [key: string]: number };
}

export interface CategoryCounts {
  [key: string]: number;
}

export interface Filters {
  month: Option;
  amount: Option;
  categories: MultiValue<ColourOption>;
}

export type ActiveView = "import" | "charts";
export type TableView = "summary" | "transaction";

export type CategoriserType = "keyword" | "ai";
export type SelectCategoriserTypeOption = {
  value: CategoriserType;
  label: string;
};

export interface Option {
  value: string;
  label: string;
}
