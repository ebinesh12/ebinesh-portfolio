"use client";

export default function GlobalError({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100 dark:bg-gray-900">
      <h1 className="text-5xl font-bold text-red-600 mb-4">500</h1>
      <h2 className="text-2xl text-gray-700 dark:text-gray-300 mb-2">
        Internal Server Error
      </h2>
      <p className="text-gray-500 mb-6">
        {error?.message || "Something went wrong."}
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Try Again
      </button>
    </div>
  );
}
