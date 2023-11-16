import Fuse from "fuse.js";
import { categoryList } from "../../data/categoryList";
import { HEADERS } from "../../data/constants";
import { CategorisedTransaction, Filters } from "../../types/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ignorePropCase = (obj: Record<string, any>, propName: string) => {
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
    }
    return transformedLabel;
  }
  return "";
};

export const filterAndSearchTransactions = ({
  allTransactions,
  query,
  filters,
  fuse,
}: {
  allTransactions: CategorisedTransaction[];
  query: string;
  filters: Filters;
  fuse: Fuse<CategorisedTransaction>;
}) => {
  let filtered: CategorisedTransaction[] = [...allTransactions];

  if (query && fuse !== null) {
    filtered = fuse.search(query).map((result) => result.item);
  }

  if (filters.month.value) {
    filtered = filtered.filter((transaction) => {
      const [, month] = transaction.date.split("/");
      return month === filters.month.value;
    });
  }

  if (filters.amount.value) {
    const [lower, upper] = filters.amount.value.split(",");
    filtered = filtered.filter((transaction) => {
      const amount = Math.abs(transaction.amount);
      if (lower && upper) {
        return amount >= +lower && amount <= +upper;
      }
      if (lower) {
        return amount >= +lower;
      }
      if (upper) {
        return amount <= +upper;
      }
      return true;
    });
  }

  // Handle categories filter
  if (filters.categories.length > 0) {
    const categoryValues = filters.categories.map((option) => option.value);
    filtered = filtered.filter(
      (transaction) =>
        transaction.category && categoryValues.includes(transaction.category),
    );
  }

  return filtered;
};

export const countUnknown = (transactions: CategorisedTransaction[]) => {
  if (transactions.length) {
    return transactions.reduce((accumulator, current) => {
      const increment = current.category === "Unknown" ? 1 : 0;
      return accumulator + increment;
    }, 0);
  }
  return 0;
};

export const areHeadersValid = (parsedHeaders: string[]): boolean => {
  if (parsedHeaders.length !== HEADERS.length) return false;
  for (let i = 0; i < parsedHeaders.length; i += 1) {
    if (parsedHeaders[i].toLowerCase() !== HEADERS[i].toLowerCase())
      return false;
  }
  return true;
};

export const categoryOptions = categoryList.map((category) => {
  return { label: category, value: category };
});
