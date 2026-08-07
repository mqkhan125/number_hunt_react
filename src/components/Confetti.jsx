const COLORS = ["#ffb703", "#fb8500", "#ff006e", "#8338ec", "#3a86ff", "#06d6a0"];

function ConfettiPiece({ delay, left, color }) {
  return (
    <div
      className="absolute -top-3 w-2 h-2 rounded-sm animate-fall pointer-events-none"
      style={{
        left: `${left}%`,
        background: color,
        animationDelay: `${delay}s`,
      }}
    />
  );
}

export default function Confetti({ count = 40 }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <ConfettiPiece
          key={i}
          left={Math.random() * 100}
          delay={Math.random() * 0.6}
          color={COLORS[i % COLORS.length]}
        />
      ))}
    </div>
  );
}
