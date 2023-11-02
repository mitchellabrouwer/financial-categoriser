import { ParsedTransaction } from "../../types/types";
import { ignorePropCase } from "./general";

export const isExternalUnlessSaving = (transaction: ParsedTransaction): boolean => {
  if (transaction.description.toLowerCase().includes("internal transfer")) {
    if (transaction.description.toLowerCase().includes("savings")) {
      return true;
    }
    return false;
  }
  return true;
};

export const isValidTransaction = (transaction: ParsedTransaction): boolean => {
  const requiredFields = ["date", "description", "amount"];

  for (const field of requiredFields) {
    const value = ignorePropCase(transaction, field);
    if (
      typeof value === "undefined" ||
      (typeof value === "string" && value.trim() === "") ||
      (typeof value === "number" && (value === 0 || isNaN(value)))
    ) {
      return false;
    }
  }
  return true;
};

export const removeReceiptInfo = (input: string): string => {
  if (input) {
    return input.replace(/ - Receipt.*$/, "");
  }
  return input;
};
