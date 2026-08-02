export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f1e8] px-6 dark:bg-neutral-950">
      <div className="flex flex-col items-center text-center">
        <div className="animate-pulse">
          <img
            src="/logo.png"   
            alt="ExpenseTrack"
            className="w-64 object-contain"
          />
        </div>
        <div className="mt-8 flex items-center gap-2">
          <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.3s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.15s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-green-500" />
        </div>
        <p className="mt-4 text-sm font-medium text-gray-500 dark:text-gray-400">
          Loading your finances...
        </p>
      </div>
    </main>
  );
}
