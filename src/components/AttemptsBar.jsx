export default function AttemptsBar({ attemptsLeft, totalAttempts }) {
  const pct = Math.max(0, (attemptsLeft / totalAttempts) * 100);

  const fillClass =
    pct > 50
      ? "bg-gradient-to-r from-good to-cool"
      : pct > 20
      ? "bg-gradient-to-r from-flare-2 to-flare"
      : "bg-gradient-to-r from-pop to-red-700";

  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="flex-1 h-2 rounded-full bg-white/8 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${fillClass}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-mist whitespace-nowrap">
        {attemptsLeft} / {totalAttempts} left
      </span>
    </div>
  );
}
