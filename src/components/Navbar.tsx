import { FC } from "react";
import { FaLock, FaTable } from "react-icons/fa";
import { ActiveView, CategorisedTransaction } from "../types/types";
import ExportToCsv from "./ExportToCsv";

interface NavbarProps {
  activeView: ActiveView;
  setActiveView: React.Dispatch<React.SetStateAction<ActiveView>>;
  transactions: CategorisedTransaction[];
}

export const Navbar: FC<NavbarProps> = ({
  activeView,
  setActiveView,
  transactions,
}) => {
  return (
    <div className="fixed left-0 top-0 mb-2 w-full bg-automotive text-white dark:bg-dining">
      <div className="container mx-auto flex items-center justify-center py-2 md:justify-between md:px-6 md:py-2">
        {/* Brand Logo and Name */}
        <div
          className="hidden items-center hover:cursor-pointer md:flex"
          onClick={() => setActiveView("import")}
        >
          <FaLock className="mr-2" />
          <span className="text-lg font-semibold">centsiblility</span>
        </div>

        {/* Nav Items */}
        <div className="flex space-x-4">
          <button
            className={`flex items-center space-x-1 rounded-lg py-1 text-sm 
            ${activeView === "import" && "underline"}
            `}
            onClick={() => setActiveView("import")}
          >
            <FaTable />
            <span>Import</span>
          </button>

          <ExportToCsv
            transactions={transactions}
            styles="flex items-center space-x-1 rounded-lg py-1 text-sm"
          />
        </div>
      </div>
    </div>
  );
};
