import { v4 as uuidv4 } from "uuid";
import { ParsedTransaction, Transaction } from "../../types/types";
import { ignorePropCase } from "../utilities/general";
import {
  isExternalUnlessSaving,
  isValidTransaction,
  removeReceiptInfo,
} from "../utilities/transactionValidation";

export const parseTransactions = (
  rawCsv: Papa.ParseResult<Transaction>,
): ParsedTransaction[] => {
  // const startDate = moment(
  //   ignorePropCase(rawCsv.data[0], "date"),
  //   "DD-MM-YYYY",
  // );

  // const endDate = startDate.clone().subtract(MAX_MONTHS, "months");

  // const recentYearData = rawCsv.data.filter((row) => {
  //   const rowDate = moment(ignorePropCase(row, "date"), "DD-MM-YYYY");
  //   return rowDate.isBetween(endDate, startDate, undefined, "[)");
  // });

  // TODO: check structure and return error if not in correct format
  const parsedTransactions = rawCsv.data.map((transaction) => {
    const debit = Number(ignorePropCase(transaction, "debit"));
    const credit = Number(ignorePropCase(transaction, "credit"));
    const amount = debit + credit;

    return {
      id: uuidv4(),
      date: ignorePropCase(transaction, "date"),
      description: removeReceiptInfo(
        ignorePropCase(transaction, "description"),
      ),
      amount: amount,
    };
  });

  const validParsedTransactions: ParsedTransaction[] =
    parsedTransactions.filter(
      (transaction) =>
        isValidTransaction(transaction) && isExternalUnlessSaving(transaction),
    );
  return validParsedTransactions;
};
