import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTransactionProcessing } from "../hooks/useTransactionProcessing";
import { aggregateByMonth } from "../lib/transactions/aggregateByMonth";
import { countByCategory } from "../lib/transactions/countByCategory";
import { ActiveView } from "../types/types";
import Features from "./Features";
import { FileDrop } from "./FileDrop";
import Footer from "./Footer";
import { Loader } from "./Loader";
import { Navbar } from "./Navbar";
import { ProgressLoader } from "./ProgressLoader";
import { SampleDataButton } from "./SampleDataButton";

const ChartsSmallScreenDynamic = dynamic(() => import("./ChartsSmallScreen"), {
  ssr: false,
});
const ChartsLaregeScreenDynamic = dynamic(() => import("./ChartsLargeScreen"), {
  ssr: false,
});

function Dashboard() {
  const {
    isLoading,
    setIsLoading,
    progressLoader,
    categoriserType,
    // setCategoriserType,
    transactions,
    setTransactions,
    allTransactions,
    setAllTransactions,
    processFile,
    categoriesByMonth,
    categoryCount,
    setCategoriesByMonth,
    setCategoryCount,
  } = useTransactionProcessing();
  const [activeView, setActiveView] = useState<ActiveView>("import");

  const isInitialRender = useRef(true);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  // const handleModelChange = (
  //   selectedOption: SelectCategoriserTypeOption | null,
  // ) => {
  //   if (selectedOption?.value) {
  //     setCategoriserType(selectedOption.value);
  //   }
  // };

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    setCategoriesByMonth(aggregateByMonth(transactions));
    setCategoryCount(countByCategory(transactions));
  }, [transactions, setCategoriesByMonth, setCategoryCount]);

  useEffect(() => {
    if (progressLoader === 100) {
      setIsLoading(false);
      setActiveView("charts");
    }
  }, [setActiveView, setIsLoading, progressLoader]);

  const loader =
    categoriserType === "keyword" ? (
      <ProgressLoader progressLoader={progressLoader} />
    ) : (
      <Loader isLoading={isLoading} />
    );

  return (
    <div>
      <div className="flex w-full items-center justify-center">
        <ToastContainer theme="dark" />
        <Navbar
          activeView={activeView}
          setActiveView={setActiveView}
          transactions={transactions}
        />
        <div className="m-auto w-full">
          {isLoading ? (
            loader
          ) : (
            <div className="w-full">
              {activeView === "import" && (
                <>
                  {/* <h2 className="text-base font-semibold leading-7 text-gray-200 md:text-center">
                    Select categorisation and upload CSV
                  </h2> */}
                  {/* <div className="flex w-full justify-center">
                    <ModelSelect onChange={handleModelChange} />
                  </div> */}
                  <FileDrop handleFileChange={handleFileChange} />
                  <div className="flex w-full justify-center">
                    <Features />
                  </div>
                  <div className="w-full text-center">
                    <SampleDataButton
                      setTransactions={setTransactions}
                      setAllTransactions={setAllTransactions}
                      setActiveView={setActiveView}
                    />
                  </div>
                </>
              )}

              {activeView === "charts" && transactions.length > 0 && (
                <>
                  <ChartsSmallScreenDynamic
                    transactions={transactions}
                    categoriesByMonth={categoriesByMonth || {}}
                    categoryCount={categoryCount || {}}
                    allTransactions={allTransactions}
                    setTransactions={setTransactions}
                  />

                  <ChartsLaregeScreenDynamic
                    transactions={transactions}
                    categoriesByMonth={categoriesByMonth || {}}
                    categoryCount={categoryCount || {}}
                    allTransactions={allTransactions}
                    setTransactions={setTransactions}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
