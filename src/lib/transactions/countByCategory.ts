import { CategorisedTransaction, CategoryCounts } from "../../types/types";

function countByCategory(
  transactions: CategorisedTransaction[],
): CategoryCounts {
  const categoryCounts = transactions.reduce<CategoryCounts>(
    (accumulator, transaction) => {
      const { category } = transaction;
      if (category) {
        accumulator[category] = (accumulator[category] || 0) + 1;
      }
      return accumulator;
    },
    {},
  );
  return categoryCounts;
}

export default countByCategory;
