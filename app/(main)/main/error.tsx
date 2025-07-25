'use client';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] text-center text-white space-y-4">
      <h1 className="text-2xl font-semibold text-red-500">Something went wrong</h1>
      <p className="text-sm text-gray-400">{error.message || 'Unknown error occurred.'}</p>
      
      <button
        onClick={reset}
        className="mt-4 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md"
      >
        Try Again
      </button>
    </div>
  );
}
