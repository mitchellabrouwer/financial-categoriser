import { CategorisedTransaction, CategoryCounts } from "../../types/types";

export const countByCategory = (
  transactions: CategorisedTransaction[],
): CategoryCounts => {
  const categoryCounts = transactions.reduce<CategoryCounts>(
    (accumulator, transaction) => {
      const category = transaction.category;
      if (category) {
        accumulator[category] = (accumulator[category] || 0) + 1;
      }
      return accumulator;
    },
    {},
  );
  return categoryCounts;
};
