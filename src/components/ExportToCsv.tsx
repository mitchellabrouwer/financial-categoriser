import { FaFileExport } from "react-icons/fa";
import sortByDate from "../lib/utilities/sort";
import { CategorisedTransaction } from "../types/types";

interface ExportToCsvProps {
  transactions: CategorisedTransaction[];
  styles: string;
}

function ExportToCsv({ transactions, styles }: ExportToCsvProps) {
  const exportToCsv = () => {
    if (transactions?.length > 0) {
      const sortedTransactions = sortByDate(transactions);
      const header = Object.keys(sortedTransactions[0]).join(",");

      const rows = sortedTransactions.map((t) => {
        const row = [t.id, t.date, t.description, t.amount, t.category || ""];
        return row.join(",");
      });
      const csvContent = [header, ...rows].join("\n");

      // Create a Blob object to store the CSV content
      const blob = new Blob([csvContent], { type: "text/csv" });

      // Create an anchor tag to trigger the download
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "transactions.csv";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <button type="button" onClick={exportToCsv} className={styles}>
      <FaFileExport />
      <span>Export</span>
    </button>
  );
}

export default ExportToCsv;
