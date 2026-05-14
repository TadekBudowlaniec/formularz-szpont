export default function ScarcityBar() {
  // edit me
  const text = "Wolne terminy w czerwcu: 2 miejsca";

  return (
    <div className="border-b border-emerald-900/40 bg-emerald-600/10">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-2 text-center text-xs font-medium text-emerald-300 md:px-6">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
        </span>
        {text}
      </div>
    </div>
  );
}
