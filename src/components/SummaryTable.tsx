import { WEEKS_PER_MONTH } from "../data/constants";
import { formatCurrency } from "../lib/utilities/general";
import { CategoryCounts, MonthlyCategoryTotals } from "../types/types";

export default function SummaryTable({
  categoryByMonth,
  counts,
}: {
  categoryByMonth: MonthlyCategoryTotals;
  counts: CategoryCounts;
}) {
  const months = Number(Object.keys(categoryByMonth).length - 1);
  const totalByCategory: { [key: string]: number } = {};
  let totalSpend = 0;

  Object.entries(categoryByMonth).forEach(([, categories]) => {
    Object.entries(categories).forEach(([category, amount]) => {
      totalByCategory[category] = (totalByCategory[category] || 0) + amount;
      totalSpend += amount;
    });
  });

  const sortedCategories = Object.keys(totalByCategory).sort(
    (a, b) => totalByCategory[b] / totalSpend - totalByCategory[a] / totalSpend,
  );

  return (
    <div className="relative mx-2 my-2 h-full overflow-scroll shadow-md sm:rounded-lg">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th
              scope="col"
              className="sticky top-0 rounded-tl-lg bg-gray-50 px-3 py-1 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:bg-gray-700 md:px-3 md:py-1"
            >
              Category
            </th>
            <th
              scope="col"
              className="sticky top-0 hidden bg-gray-50 px-3 py-1 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:bg-gray-700 lg:table-cell"
            >
              Count
            </th>
            <th
              scope="col"
              className="sticky top-0 bg-gray-50 px-3 py-1 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:bg-gray-700"
            >
              Avg/Week
            </th>
            <th
              scope="col"
              className="xs:table-cell sticky top-0 hidden bg-gray-50 px-3 py-1 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:bg-gray-700"
            >
              Avg/Mth
            </th>
            <th
              scope="col"
              className="sticky top-0 hidden bg-gray-50 px-3 py-1 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:bg-gray-700 lg:table-cell"
            >
              Total
            </th>
            <th
              scope="col"
              className="sticky top-0 bg-gray-50 px-3 py-1 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:bg-gray-700"
            >
              %
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {sortedCategories.map((category, index) => (
            <tr
              key={category}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-500">
                {category}
              </td>
              <td className="hidden whitespace-nowrap px-2 py-3 text-center text-sm text-gray-500 lg:table-cell">
                {counts[category]}
              </td>
              <td className="whitespace-nowrap px-3 py-3 text-center text-sm text-gray-500">
                {totalByCategory[category]
                  ? formatCurrency(
                      totalByCategory[category] / months / WEEKS_PER_MONTH,
                    )
                  : formatCurrency(0)}
              </td>
              <td className="xs:table-cell hidden whitespace-nowrap px-3 py-3 text-center text-sm text-gray-500">
                {totalByCategory[category]
                  ? formatCurrency(totalByCategory[category] / months)
                  : formatCurrency(0)}
              </td>
              <td className="hidden whitespace-nowrap px-3 py-3 text-center text-sm text-gray-500 lg:table-cell">
                {formatCurrency(totalByCategory[category])}
              </td>
              <td className="whitespace-nowrap px-3 py-3 text-center text-sm text-gray-500">
                {`${Math.round(
                  (totalByCategory[category] / totalSpend) * 100,
                )}%`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
