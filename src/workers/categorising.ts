import fetchCategoriesFromModel from "../api/fetchCategoriesFromModel";
import { genericCategories } from "../data/genericCategories";
import { specificCategories } from "../data/specificCategories";
import { aggregateByMonth } from "../lib/transactions/aggregateByMonth";
import { countByCategory } from "../lib/transactions/countByCategory";
import {
  containsFullWord,
  containsWordPartial,
} from "../lib/utilities/containsWord";
import { CategorisedTransaction, ParsedTransaction } from "../types/types";

const clashResolvers: Record<string, string> = {
  Rent: "Housing",
  "Coles Express": "Transport",
  CWH: "Health",
  CW: "Health",
  FOODMARKET: "Groceries",
  WHS: "Education",
  // Bonds: "Shopping",
  // Coles: "Groceries",
};

// export const resolveKnownClashes = (
//   description: string,
// ): string | undefined => {
//   for (const key of Object.keys(clashResolvers)) {
//     if (description.includes(key)) {
//       return clashResolvers[key];
//     }
//   }
//   return undefined;
// };

export const resolveKnownClashes = (
  description: string,
): string | undefined => {
  const clashKey = Object.keys(clashResolvers).find((key) =>
    description.includes(key),
  );
  return clashKey ? clashResolvers[clashKey] : undefined;
};

const categoriseTransaction = (
  description: string,
  categories: Record<string, string[]>,
  checkFn: (phrase: string, target: string) => boolean,
): string | undefined => {
  const foundCategory = Object.entries(categories).find(([, keywords]) =>
    keywords.some((keyword) => checkFn(description, keyword)),
  );

  return foundCategory ? foundCategory[0] : undefined;
};

export const keywordCategorise = (
  transactions: ParsedTransaction[],
): CategorisedTransaction[] => {
  return transactions.map((transaction, index) => {
    const categorisedTransaction: CategorisedTransaction = { ...transaction };

    const knownClashCategory = resolveKnownClashes(transaction.description);
    if (knownClashCategory) {
      categorisedTransaction.category = knownClashCategory;
      return categorisedTransaction;
    }

    categorisedTransaction.category =
      categoriseTransaction(
        transaction.description,
        specificCategories,
        containsFullWord,
      ) ||
      categoriseTransaction(
        transaction.description,
        genericCategories,
        containsFullWord,
      ) ||
      categoriseTransaction(
        transaction.description,
        specificCategories,
        containsWordPartial,
      ) ||
      categoriseTransaction(
        transaction.description,
        genericCategories,
        containsWordPartial,
      ) ||
      "Unknown";

    postMessage({
      progress: (index / transactions.length) * 100,
    });
    return categorisedTransaction;
  });
};

onmessage = async function (messageEvent) {
  const { transactions, categoriserType } = messageEvent.data;

  let result: CategorisedTransaction[] = [];

  if (categoriserType === "keyword") {
    result = keywordCategorise(transactions);
  } else if (categoriserType === "ai") {
    result = await fetchCategoriesFromModel(transactions);
  }

  const categoriesByMonth = aggregateByMonth(result);
  const categoryCount = countByCategory(result);

  postMessage({
    transactions: result,
    categoriesByMonth,
    categoryCount,
    progress: 100,
  });
};
