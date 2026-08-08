// Modal overlay explaining the rules — opened from the start screen

export default function HowToPlay({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[380px] bg-ink-800 border border-white/10 rounded-[20px] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.6)] animate-pop-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-paper">How to Play</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-mist text-sm cursor-pointer hover:bg-white/15 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3 text-sm text-mist leading-relaxed">
          <p>
            <span className="text-paper font-semibold">Goal:</span> Guess the
            hidden number in as few attempts as possible.
          </p>
          <p>
            <span className="text-paper font-semibold">Hints:</span> After each
            guess you'll see whether the number is higher or lower.
          </p>
          <p>
            <span className="text-cool font-semibold">Blue ↑</span> means your
            guess was too low.{" "}
            <span className="text-pop font-semibold">Pink ↓</span> means too
            high.
          </p>
          <p>
            <span className="text-paper font-semibold">Journey Mode:</span>{" "}
            Progress through 10 levels with increasing difficulty. Beat a level
            to unlock the next.
          </p>
          <p>
            <span className="text-paper font-semibold">Quick Play:</span> Pick a
            difficulty and jump right in — great for practice.
          </p>
          <p>
            <span className="text-flare font-semibold">Personal Bests:</span>{" "}
            Your fewest-attempts record for each level is saved automatically.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-5 py-2.5 text-sm font-bold text-ink-950 rounded-xl cursor-pointer bg-gradient-to-r from-flare-2 to-flare hover:brightness-110 transition-all"
        >
          Got It
        </button>
      </div>
    </div>
  );
}
