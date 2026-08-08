import { useState } from "react";
import { playClick } from "../utils/sound";
import HowToPlay from "./HowToPlay";
import SoundToggle from "./SoundToggle";

// The landing screen — choose between Journey Mode and Quick Play

export default function StartScreen({ onJourney, onQuickPlay }) {
  const [showHelp, setShowHelp] = useState(false);

  function handleJourney() {
    playClick();
    onJourney();
  }

  function handleQuickPlay() {
    playClick();
    onQuickPlay();
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 bg-[radial-gradient(circle_at_15%_10%,#241a3d_0%,#140e26_55%,#0b0718_100%)] font-sans">
      {/* Top-right controls — absolute so they don't shift the layout */}
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={() => {
            playClick();
            setShowHelp(true);
          }}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white/7 border border-white/10 text-mist text-sm font-bold cursor-pointer hover:bg-white/12 transition-colors"
          title="How to Play"
          aria-label="How to Play"
        >
          ?
        </button>
        <SoundToggle />
      </div>

      {/* Title */}
      <div className="text-center mb-8 animate-pop-in">
        <h1 className="text-[36px] font-extrabold text-paper tracking-tight">
          Number Hunt
        </h1>
        <p className="mt-2 text-sm text-mist">
          Can you find the hidden number?
        </p>
      </div>

      {/* Two mode-selection cards */}
      <div className="w-full max-w-[380px] flex flex-col gap-4 animate-pop-in">
        {/* Journey Mode */}
        <button
          onClick={handleJourney}
          className="w-full text-left p-5 bg-ink-800 border border-white/8 rounded-[18px] cursor-pointer hover:border-flare/30 hover:shadow-[0_8px_30px_rgba(255,122,61,0.12)] transition-all duration-200 group"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-flare-2 to-flare flex items-center justify-center text-lg shrink-0">
              🗺️
            </div>
            <div>
              <h2 className="text-[17px] font-bold text-paper group-hover:text-flare transition-colors">
                Journey Mode
              </h2>
              <p className="text-xs text-mist mt-0.5">
                10 levels of increasing difficulty
              </p>
            </div>
          </div>
          {/* Decorative progress bar hint */}
          <div className="flex gap-1.5 mt-3">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="h-1 flex-1 rounded-full bg-gradient-to-r from-flare-2 to-flare opacity-60"
              />
            ))}
          </div>
        </button>

        {/* Quick Play */}
        <button
          onClick={handleQuickPlay}
          className="w-full text-left p-5 bg-ink-800 border border-white/8 rounded-[18px] cursor-pointer hover:border-cool/30 hover:shadow-[0_8px_30px_rgba(58,134,255,0.12)] transition-all duration-200 group"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cool to-[#6aa0ff] flex items-center justify-center text-lg shrink-0">
              ⚡
            </div>
            <div>
              <h2 className="text-[17px] font-bold text-paper group-hover:text-cool transition-colors">
                Quick Play
              </h2>
              <p className="text-xs text-mist mt-0.5">
                Pick a difficulty and jump in
              </p>
            </div>
          </div>
          {/* Show the three difficulty tags */}
          <div className="flex gap-2 mt-3">
            {["Easy", "Medium", "Hard"].map((d) => (
              <span
                key={d}
                className="text-[11px] font-bold text-cool/70 bg-cool/10 rounded-full px-2.5 py-0.5"
              >
                {d}
              </span>
            ))}
          </div>
        </button>
      </div>

      <HowToPlay isOpen={showHelp} onClose={() => setShowHelp(false)} />
    </div>
  );
}
