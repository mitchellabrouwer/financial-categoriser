import {
  ArcElement,
  ChartData,
  Chart as ChartJS,
  ChartOptions,
  Colors,
  Legend,
  Tooltip,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { isMobile } from "react-device-detect";
import chartjsParsePie from "../lib/chartjs/pieTransform";
import aggregateByCategory from "../lib/transactions/aggregateByCategory";
import { CategorisedTransaction } from "../types/types";

ChartJS.register(ArcElement, Tooltip, Legend, Colors);

function PieChart({
  transactions,
}: {
  transactions: CategorisedTransaction[];
}) {
  const data: { income: ChartData<"pie">; expenses: ChartData<"pie"> } =
    chartjsParsePie(aggregateByCategory(transactions));

  const getPieOptions = (titleText: string): ChartOptions<"pie"> => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: !isMobile,
        text: titleText,
        position: "top",
        align: "center",
      },
      legend: {
        display: false,
      },
    },
  });

  if (!data) {
    return <div>no data to display</div>;
  }

  return (
    <div className="flex h-full w-full flex-row items-center justify-center">
      <div className="flex h-full w-1/2 items-center justify-center">
        <Pie options={getPieOptions("Expenses")} data={data?.expenses} />
      </div>
      <div className="flex h-full w-1/2 items-center justify-center">
        <Pie options={getPieOptions("Income")} data={data?.income} />
      </div>
    </div>
  );
}

export default PieChart;
