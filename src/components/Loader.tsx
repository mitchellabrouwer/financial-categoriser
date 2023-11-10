import { FC } from "react";

interface LoaderProps {
  isLoading: boolean;
}

export const Loader: FC<LoaderProps> = ({ isLoading }) => {
  return (
    <div className="relative mt-10 h-6 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
      {isLoading ? (
        <div className="h-6 animate-pulse rounded-full bg-withdrawals p-0.5 pt-1 text-center text-xs font-medium leading-none text-blue-100">
          Loading...
        </div>
      ) : null}
    </div>
  );
};
