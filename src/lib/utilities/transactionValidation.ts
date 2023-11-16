import { ParsedTransaction } from "../../types/types";
import { ignorePropCase } from "./general";

export const isExternalUnlessSaving = (
  transaction: ParsedTransaction,
): boolean => {
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

  const isValid = requiredFields.every((field) => {
    const value = ignorePropCase(transaction, field);
    if (typeof value === "undefined") {
      return false;
    }
    if (typeof value === "string" && value.trim() === "") {
      return false;
    }
    if (typeof value === "number" && (value === 0 || Number.isNaN(value))) {
      return false;
    }
    return true;
  });
  return isValid;
};

export const removeReceiptInfo = (input: string): string => {
  if (input) {
    return input.replace(/ - Receipt.*$/, "");
  }
  return input;
};
