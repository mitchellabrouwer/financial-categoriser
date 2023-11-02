import Fuse from "fuse.js";
import { HEADERS } from "../../data/constants";
import { CategorisedTransaction, Filters } from "../../types/types";

export const ignorePropCase = (obj: any, propName: string): any => {
  if (!obj) return undefined;

  return (
    obj[propName] ||
    obj[propName.toLowerCase()] ||
    obj[propName.toUpperCase()] ||
    obj[propName.charAt(0).toUpperCase() + propName.slice(1).toLowerCase()]
  );
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const toTwClass = (label?: string, prefix?: string): string => {
  if (label) {
    const transformedLabel = label
      .toLowerCase()
      .replace(/\s&\s/g, "-")
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
    if (prefix) {
      return `${prefix}${transformedLabel}`;
    } else {
      return transformedLabel;
    }
  }
  return "";
};

export const filterTransactions = (
  transactions: CategorisedTransaction[],
  filters: Filters,
  fuse: Fuse<CategorisedTransaction>,
) => {
  let filtered: CategorisedTransaction[] = [...transactions];
  const {
    month: monthFilter,
    query,
    amount: amountFilter,
    categories: categoryFilters,
  } = filters;

  if (query && fuse !== null) {
    filtered = fuse.search(query).map((result) => result.item);
  }

  if (monthFilter) {
    filtered = filtered.filter((transaction) => {
      const [_, month] = transaction.date.split("/");
      return month === monthFilter;
    });
  }

  if (amountFilter) {
    const [lower, upper] = amountFilter.split(",");
    filtered = filtered.filter((transaction) => {
      const amount = Math.abs(transaction.amount);
      if (lower && upper) {
        return amount >= +lower && amount <= +upper;
      } else if (lower) {
        return amount >= +lower;
      } else if (upper) {
        return amount <= +upper;
      }
      return true;
    });
  }

  if (categoryFilters.length > 0) {
    filtered = filtered.filter(
      (transaction) =>
        transaction.category && categoryFilters.includes(transaction.category),
    );
  }
  return filtered;
};

export const countUnknown = (transactions: CategorisedTransaction[]) => {
  if (transactions.length) {
    return transactions.reduce((accumulator, current) => {
      if (current.category === "Unknown") {
        return (accumulator += 1);
      }
      return accumulator;
    }, 0);
  }
  return 0;
};

export const areHeadersValid = (parsedHeaders: string[]): boolean => {
  if (parsedHeaders.length !== HEADERS.length) return false;
  for (let i = 0; i < parsedHeaders.length; i++) {
    if (parsedHeaders[i].toLowerCase() !== HEADERS[i].toLowerCase())
      return false;
  }
  return true;
};
