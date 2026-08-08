import { useState } from "react";
import { isMuted, toggleMute, playClick } from "../utils/sound";

// Small speaker icon button — reads global mute state from sound.js
// so both Journey and Quick Play stay in sync.

export default function SoundToggle() {
  const [muted, setMuted] = useState(isMuted());

  function handleToggle() {
    const newVal = toggleMute();
    setMuted(newVal);
    // Play a click so the user can hear the effect of unmuting
    if (!newVal) playClick();
  }

  return (
    <button
      onClick={handleToggle}
      className="w-9 h-9 flex items-center justify-center rounded-full bg-white/7 border border-white/10 text-mist text-base cursor-pointer hover:bg-white/12 transition-colors"
      title={muted ? "Unmute sounds" : "Mute sounds"}
      aria-label={muted ? "Unmute sounds" : "Mute sounds"}
    >
      {muted ? "🔇" : "🔊"}
    </button>
  );
}
