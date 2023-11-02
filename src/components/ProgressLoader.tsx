import { FC } from "react";

interface ProgressLoaderProps {
  progressLoader: number;
}

export const ProgressLoader: FC<ProgressLoaderProps> = ({ progressLoader }) => {
  return (
    <div className="relative mt-10 h-6 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
      <div
        className="h-6 rounded-full bg-withdrawals p-0.5 text-center text-xs font-medium leading-none text-blue-100 transition-all duration-300 ease-out"
        style={{ width: `${progressLoader}%` }}
      ></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center text-xs font-medium leading-none text-blue-100">
        {progressLoader}%
      </div>
    </div>
  );
};
