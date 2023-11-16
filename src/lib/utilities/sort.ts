import { CategorisedTransaction } from "../../types/types";

function sortByDate(transactions: CategorisedTransaction[]) {
  return transactions.sort((a, b) => {
    const [dayA, monthA, yearA] = a.date.split("/");

    const [dayB, monthB, yearB] = b.date.split("/");

    const timeA = new Date(`${yearA}-${monthA}-${dayA}`).getTime();
    const timeB = new Date(`${yearB}-${monthB}-${dayB}`).getTime();

    if (timeA > timeB) return -1;
    if (timeA < timeB) return 1;
    return 0;
  });
}

export default sortByDate;
