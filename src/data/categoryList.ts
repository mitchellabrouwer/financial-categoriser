import genericCategories from "./genericCategories";
import specificCategories from "./specificCategories";

export const categoryList = [
  ...new Set([
    ...Object.keys(genericCategories),
    ...Object.keys(specificCategories),
    "Miscellaneous",
    "Unknown",
  ]),
];

export const categoryDefinitions = [
  {
    name: "Automotive",
    items: ["car maintenance", "new car"],
  },
  {
    name: "Business",
    items: ["office supplies", "client meals", "advertising"],
  },
  {
    name: "Childcare",
    items: ["daycare fees", "babysitting"],
  },
  {
    name: "Deposits",
    items: ["account and security deposits"],
  },
  {
    name: "Dining",
    items: ["restaurants", "takeaways"],
  },
  {
    name: "Donations",
    items: ["charity", "fundraisers"],
  },
  {
    name: "Education",
    items: ["tuition", "school supplies"],
  },
  {
    name: "Entertainment",
    items: ["movies", "concerts"],
  },
  {
    name: "Fees & Charges",
    items: ["bank fees", "service charges"],
  },
  {
    name: "Gifts",
    items: ["birthdays", "special occasions"],
  },
  {
    name: "Groceries",
    items: ["food", "household items"],
  },
  {
    name: "Health",
    items: ["doctor visits", "medications"],
  },
  {
    name: "Hobbies & Sport",
    items: ["equipment", "club memberships"],
  },
  {
    name: "Home & Garden",
    items: ["rent", "furniture", "home improvement"],
  },
  {
    name: "Insurance",
    items: ["health", "car", "property"],
  },
  {
    name: "Investments",
    items: ["stocks", "mutual funds"],
  },
  {
    name: "Loans",
    items: ["loan payments", "student loans"],
  },
  {
    name: "Miscellaneous",
    items: ["uncategorized items"],
  },
  {
    name: "Pets",
    items: ["pet food", "vet visits"],
  },
  {
    name: "Savings",
    items: ["account transfers", "emergency funds"],
  },
  {
    name: "Shopping",
    items: ["clothing", "electronics"],
  },
  {
    name: "Transport",
    items: ["public transportation", "taxis"],
  },
  {
    name: "Travel",
    items: ["flights", "hotels"],
  },
  {
    name: "Utilities",
    items: ["gas", "water", "electricity"],
  },
  {
    name: "Withdrawals",
    items: ["cash withdrawals"],
  },
];
