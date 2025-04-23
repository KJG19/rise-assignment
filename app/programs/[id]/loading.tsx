export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full" />
      </div>
    </div>
  );
}
