import {
  AggregateTransactions,
  CategorisedTransaction,
  Tally,
} from "../../types/types";

function aggregateByCategory(
  transactions: CategorisedTransaction[],
): AggregateTransactions {
  let total = { count: 0, sum: 0 };
  const data = transactions.reduce<Tally>((accumulator, transaction) => {
    if (transaction.category) {
      const currentCount = accumulator[transaction.category]?.count;
      const currenctSum = accumulator[transaction.category]?.sum;

      // by transaction category
      accumulator[transaction.category] = {
        count: currentCount ? currentCount + 1 : 1,
        sum: currenctSum
          ? currenctSum + transaction.amount
          : transaction.amount,
      };

      // total for all transactions
      total = {
        count: total.count ? total.count + 1 : 1,
        sum: total.sum ? total.sum + transaction.amount : transaction.amount,
      };
    }
    return accumulator;
  }, {});
  return {
    total,
    data,
  };
}

export default aggregateByCategory;
