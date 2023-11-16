import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { CategorisedTransaction } from "../types/types";

type CategoryKeys =
  | "Housing"
  | "Unknown"
  | "Groceries"
  | "Savings"
  | "Utilities"
  | "Health"
  | "Shopping"
  | "Home & Garden"
  | "Transport"
  | "Automotive"
  | "Pets"
  | "Hobbies & Sport"
  | "Dining"
  | "Entertainment"
  | "Withdrawals"
  | "Investments"
  | "Fees & Charges"
  | "Deposits";

function getRandomIndex(length: number): number {
  return Math.floor(Math.random() * length);
}

const generateSampleTransactions = (
  numberOfTransactions: number,
): CategorisedTransaction[] => {
  const categories: Record<CategoryKeys, string[]> = {
    Housing: ["Rent Payment", "Mortgage Payment", "Property Tax"],
    Unknown: ["Misc Payment", "Untracked Expense", "Unknown Transfer"],
    Groceries: [
      "Market Groceries",
      "Supermarket Shopping",
      "Local Store Purchase",
    ],
    Savings: ["Monthly Savings", "Emergency Fund", "Annual Savings"],
    Utilities: ["Water Bill", "Electricity Bill", "Gas Bill"],
    Health: ["Doctor Visit", "Pharmacy Drugs", "Dental Check"],
    Shopping: ["Clothes Purchase", "Online Shopping", "Electronics Buy"],
    "Home & Garden": [
      "Gardening Supplies",
      "Home Repair",
      "Furniture Purchase",
    ],
    Transport: ["Train Ticket", "Bus Fare", "Flight Ticket"],
    Automotive: ["Car Maintenance", "Fuel Refill", "Car Insurance"],
    Pets: ["Dog Food", "Cat Toys", "Veterinarian Visit"],
    "Hobbies & Sport": ["Gym Membership", "Sports Equipment", "Art Supplies"],
    Dining: ["Restaurant Meal", "Coffee Shop", "Dinner Date"],
    Entertainment: ["Movie Tickets", "Concert", "Theatre Tickets"],
    Withdrawals: ["ATM Withdrawal", "Cash Pickup", "Foreign ATM"],
    Investments: ["Stock Purchase", "Bond Buy", "Mutual Fund Investment"],
    "Fees & Charges": ["Service Fee", "Transaction Fee", "Late Fee"],
    Deposits: ["Paycheck", "Salary"],
  };

  const transactions: CategorisedTransaction[] = [];

  for (let i = 0; i < numberOfTransactions; i += 1) {
    const categoryKeys = Object.keys(categories);
    const randomCategory = categoryKeys[
      getRandomIndex(categoryKeys.length)
    ] as CategoryKeys;

    const today = moment();
    const startDate = moment().subtract(6, "months");
    const daysDifference = today.diff(startDate, "days");
    const randomDays = getRandomIndex(daysDifference);
    const randomDate = today
      .clone()
      .subtract(randomDays, "days")
      .format("DD/MM/YYYY");

    const description =
      categories[randomCategory][
        getRandomIndex(categories[randomCategory].length)
      ];

    let amount = (Math.random() * 500 + 5) * -1;
    if (randomCategory === "Deposits") {
      amount *= -1;
    }

    transactions.push({
      id: uuidv4(),
      date: randomDate,
      description,
      amount,
      category: randomCategory,
    });
  }

  return transactions;
};

export default generateSampleTransactions;
