export default function GuessHistory({ history }) {
  if (history.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5 justify-center mt-5">
      {history.map((h, i) => (
        <span
          key={i}
          className={`text-xs font-bold px-2.5 py-1 rounded-full ${
            h.direction === "low"
              ? "bg-cool/15 text-cool"
              : "bg-pop/15 text-pop"
          }`}
        >
          {h.guess} {h.direction === "low" ? "↑" : "↓"}
        </span>
      ))}
    </div>
  );
}
