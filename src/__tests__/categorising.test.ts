import { v4 as uuidv4 } from "uuid";
import { keywordCategorise } from "../workers/categorising";

const data = [
  { phrase: "Coles Express", category: "Transport" },
  { phrase: "McDonalds", category: "Dining" },
  { phrase: "DAN MURPHY'S/291 MT ALEXA", category: "Groceries" },

  // actual
  { phrase: "Rent - BPAY Bill Payment", category: "Housing" },
  { phrase: "rates - BPAY Bill Payment", category: "Housing" },
  { phrase: "Rent - BPAY Bill Payment", category: "Housing" },
  { phrase: "OKUKAN & KINDY KARATE", category: "Hobbies & Sport" },
  { phrase: "PHUOC THANH BAKERY - Visa Purchase", category: "Dining" },
  { phrase: "MYKI PASCOE V1 RS PVL", category: "Transport" },

  // generated
  { phrase: "Mortgage Payment", category: "Housing" },
  { phrase: "Property Tax", category: "Housing" },
  { phrase: "Retirement Fund Contribution", category: "Investments" },
  { phrase: "Cat Food Purchase", category: "Pets" },
  { phrase: "Vet Visit", category: "Pets" },
  { phrase: "Water Bill", category: "Utilities" },
  { phrase: "Gas Bill", category: "Utilities" },
  { phrase: "Train Ticket", category: "Transport" },
  { phrase: "Flight Booking", category: "Travel" },
  { phrase: "Spotify Subscription", category: "Entertainment" },
  { phrase: "Movie Tickets", category: "Entertainment" },
  { phrase: "Lunch at McDonald's", category: "Dining" },
  { phrase: "Coffee at Starbucks", category: "Dining" },
  { phrase: "Car Repair", category: "Automotive" },
  { phrase: "Car Wash", category: "Automotive" },
  { phrase: "Amazon Purchase", category: "Shopping" },
  { phrase: "Clothes Shopping at Zara", category: "Shopping" },
  { phrase: "Cash Withdrawal", category: "Withdrawals" },
  { phrase: "Prescription Medicine", category: "Health" },
  { phrase: "Dental Checkup", category: "Health" },
  { phrase: "Mutual Fund Investment", category: "Investments" },
  { phrase: "Cryptocurrency Buy", category: "Investments" },
  { phrase: "Sports Equipment", category: "Hobbies & Sport" },
  { phrase: "Guitar Purchase", category: "Hobbies & Sport" },
  { phrase: "Home Appliances", category: "Home & Garden" },
  { phrase: "Furniture Purchase", category: "Home & Garden" },
  { phrase: "Bank Service Charge", category: "Fees & Charges" },
  { phrase: "Late Fee", category: "Fees & Charges" },
  { phrase: "privateinternet", category: "Utilities" },
  { phrase: "my footdr aust", category: "Health" },
  { phrase: "Trade - Transfer", category: "Investments" },
  { phrase: "Street Bond and Rent", category: "Housing" },
  { phrase: "Viynl plank flooring carpet country", category: "Home & Garden" },
];

const date = "03/12/2050";
const amount = 100;

describe("Phrase categorization", () => {
  test.each(data)("Given phrase should return category '%s'", (example) => {
    global.postMessage = jest.fn();

    const { phrase, category } = example;
    const transaction = [{ id: uuidv4(), date, description: phrase, amount }];

    expect(keywordCategorise(transaction)[0]).toMatchObject({
      amount,
      category,
      date,
      description: phrase,
    });
  });
});
