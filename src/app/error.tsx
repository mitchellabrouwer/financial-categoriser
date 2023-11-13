"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <div className="text-center">
        <h1 className="mb-2 text-4xl font-bold text-white">
          Sorry, thats awkward somthing went wrong!
        </h1>
        {/* <p className="my-4 text-white">{error.message}</p> */}
        <button
          onClick={() => reset()}
          className="mx-2 inline-block w-32 rounded border border-white px-4 py-2 align-middle font-semibold text-white hover:bg-gray-800"
        >
          Try Again
        </button>
        <a
          href="/"
          className="inline-block w-32 rounded border border-white px-4 py-2 align-middle font-semibold text-white hover:bg-gray-800"
        >
          Home
        </a>
      </div>
    </div>
  );
}
