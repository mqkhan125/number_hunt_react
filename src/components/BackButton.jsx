// Reusable back-arrow button used in both game modes

export default function BackButton({ onBack }) {
  return (
    <button
      onClick={onBack}
      className="w-9 h-9 flex items-center justify-center rounded-full bg-white/7 border border-white/10 text-mist text-sm cursor-pointer hover:bg-white/12 transition-colors"
      title="Back to menu"
      aria-label="Back to menu"
    >
      ←
    </button>
  );
}
