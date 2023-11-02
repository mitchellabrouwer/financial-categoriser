import type { ChartData, ChartOptions } from "chart.js";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { isMobile } from "react-device-detect";
import { chartjsParseBar } from "../lib/chartjs/barTransform";
import { MonthlyCategoryTotals } from "../types/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function BarChart({
  transactionsByMonth,
}: {
  transactionsByMonth: MonthlyCategoryTotals;
}) {
  const data: ChartData<"bar"> = chartjsParseBar(transactionsByMonth);

  const options: ChartOptions<"bar"> = {
    indexAxis: "y",
    plugins: {
      title: {
        display: !isMobile,
        text: "Yearly Data by Month",
      },
      legend: {
        display: false,
      },
    },
    // responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "linear",
        stacked: true,
        reverse: true,
      },
      y: {
        type: "category",
        stacked: true,
      },
    },
  };
  return (
    <div className="h-full">
      <Bar options={options} data={data} />
    </div>
  );
}
