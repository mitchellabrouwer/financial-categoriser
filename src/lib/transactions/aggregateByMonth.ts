import {
  CategorisedTransaction,
  MonthlyCategoryTotals,
} from "../../types/types";

// TODO: add return type
export const aggregateByMonth = (
  transactions: CategorisedTransaction[],
): MonthlyCategoryTotals => {
  const organiseByMonth = transactions.reduce<MonthlyCategoryTotals>(
    (accumulator, transaction) => {
      // assuming dd/mm/yyyy format

      const [day, month, year] = transaction.date.split("/");
      const monthYear = `${year}-${month}`;
      if (transaction.amount < 0) {
        if (!accumulator[monthYear]) {
          accumulator[monthYear] = {};
        }

        if (transaction.category) {
          if (!accumulator[monthYear][transaction.category]) {
            accumulator[monthYear][transaction.category] = 0;
          }

          accumulator[monthYear][transaction.category] += transaction.amount;
        }

        return accumulator;
      } else {
        return accumulator;
      }
    },
    {},
  );

  return organiseByMonth;
};
