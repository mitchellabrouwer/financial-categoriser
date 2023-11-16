import type { ChartData } from "chart.js";
import colours from "../../../styles/colours";
import { AggregateTransactions } from "../../types/types";
import { toTwClass } from "../utilities/general";

function chartjsParsePie(transactions: AggregateTransactions): {
  income: ChartData<"pie">;
  expenses: ChartData<"pie">;
} {
  // if (Object.keys(transactions).length === 0) {
  //   return null;
  // }

  const incomeLabels: string[] = [];
  const incomeValues: number[] = [];
  const incomeBackgroundColours: string[] = [];
  const incomeBorderColours: string[] = [];

  const expenseLabels: string[] = [];
  const expenseValues: number[] = [];
  const expenseBackgroundColours: string[] = [];
  const expenseBorderColours: string[] = [];

  Object.entries(transactions.data).forEach(([category, value]) => {
    const borderClass = toTwClass(category);
    const backgroundClass = toTwClass(category);

    if (value.sum > 0) {
      incomeLabels.push(category);
      incomeValues.push(value.sum);
      incomeBackgroundColours.push(colours.backgroundColor[backgroundClass]);
      incomeBorderColours.push(colours.borderColor[borderClass]);
    } else if (value.sum < 0) {
      expenseLabels.push(category);
      expenseValues.push(Math.abs(value.sum));
      expenseBackgroundColours.push(colours.backgroundColor[backgroundClass]);
      expenseBorderColours.push(colours.borderColor[borderClass]);
    }
  });

  return {
    income: {
      labels: incomeLabels,
      datasets: [
        {
          data: incomeValues,
          backgroundColor: incomeBackgroundColours,
          borderColor: incomeBorderColours,
        },
      ],
    },
    expenses: {
      labels: expenseLabels,
      datasets: [
        {
          data: expenseValues,
          backgroundColor: expenseBackgroundColours,
          borderColor: expenseBorderColours,
        },
      ],
    },
  };
}

export default chartjsParsePie;
