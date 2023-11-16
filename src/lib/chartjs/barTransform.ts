import type { ChartData } from "chart.js";
import moment from "moment";
import genericCategories from "../../data/genericCategories";
import specificCategories from "../../data/specificCategories";
import colours from "../../styles/colours";
import { MonthlyCategoryTotals } from "../../types/types";
import { toTwClass } from "../utilities/general";

function chartjsParseBar(
  transactions: MonthlyCategoryTotals,
): ChartData<"bar"> {
  const transactionsSorted = Object.keys(transactions)
    .sort((a, b) => moment(b, "YYYY-MM").diff(moment(a, "YYYY-MM")))
    .map((date) => {
      return { date, categories: transactions[date] };
    });

  const categories = [
    ...new Set([
      ...Object.keys(genericCategories),
      ...Object.keys(specificCategories),
      "Misc",
      "Unknown",
    ]),
  ].sort();

  const datasets = Array.from(categories).map((category) => {
    const borderClass = toTwClass(category);
    const backgroundClass = toTwClass(category);

    return {
      label: category,
      data: transactionsSorted.map(
        (details) => details.categories[category] || 0,
      ),
      borderColor: transactionsSorted.map(() => {
        return colours.borderColor[borderClass];
      }),
      backgroundColor: transactionsSorted.map(
        () => colours.backgroundColor[backgroundClass],
      ),
      borderWidth: 1,
    };
  });

  return {
    labels: transactionsSorted.map((details) => details.date),
    datasets,
  };
}

export default chartjsParseBar;
