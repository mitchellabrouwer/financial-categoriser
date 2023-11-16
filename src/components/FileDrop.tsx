import { ChangeEventHandler } from "react";
import { HEADERS } from "../data/constants";

interface FileDropProps {
  handleFileChange: ChangeEventHandler<HTMLInputElement>;
}

function FileDrop({ handleFileChange }: FileDropProps) {
  return (
    <div className="mt-2 flex justify-center">
      <label
        htmlFor="dropzone-file"
        className="h-38 flex w-full max-w-3xl cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-600 bg-gray-700 hover:border-gray-500 hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <svg
            className="mb-4 h-12 w-12 text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-400">
            <span className="font-semibold">Click to upload CSV</span> or drag
            and drop
          </p>
          <p className="mb-2 text-sm text-gray-400">
            Please submit in the following format:
          </p>

          <div className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] justify-start p-2 text-xs">
            {HEADERS.map((header) => (
              <div key={header} className="border p-1">
                {header}
              </div>
            ))}

            <div className="bg-slate-600 p-1">01/01/2023</div>
            <div className="bg-slate-600 p-1">Sample Description</div>
            <div className="bg-slate-600 p-1">0.00</div>
            <div className="bg-slate-600 p-1">100.00</div>
            <div className="bg-slate-600 p-1">50.00</div>

            <div className="bg-slate-600 p-1">02/01/2023</div>
            <div className="bg-slate-600 p-1">Another Description</div>
            <div className="bg-slate-600 p-1">150.00</div>
            <div className="bg-slate-600 p-1">0.00</div>
            <div className="bg-slate-600 p-1">200.00</div>
          </div>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          accept=".csv"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}

export default FileDrop;
