import { FaLock, FaTable } from "react-icons/fa";
import { ActiveView, CategorisedTransaction } from "../types/types";
import ExportToCsv from "./ExportToCsv";

interface NavbarProps {
  activeView: ActiveView;
  setActiveView: React.Dispatch<React.SetStateAction<ActiveView>>;
  transactions: CategorisedTransaction[];
}

function Navbar({ activeView, setActiveView, transactions }: NavbarProps) {
  return (
    <div className="fixed left-0 top-0 mb-2 w-full bg-utilities text-white">
      <div className="container mx-auto flex items-center justify-center py-2 md:justify-between md:px-6 md:py-2">
        {/* Brand Logo and Name */}
        <button
          type="button"
          className="hidden items-center hover:cursor-pointer md:flex"
          onClick={() => setActiveView("import")}
        >
          <FaLock className="mr-2" />
          <span className="text-lg font-semibold">centsiblility</span>
        </button>

        {/* Nav Items */}
        <div className="flex space-x-4">
          <button
            type="button"
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
}

export default Navbar;
