import { LEVELS } from "../data/levels";

export default function LevelLadder({ activeIndex, unlockedLevel, onSelect }) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {LEVELS.map((lvl, idx) => {
        const isActive = idx === activeIndex;
        const isUnlocked = lvl.id <= unlockedLevel;

        return (
          <button
            key={lvl.id}
            disabled={!isUnlocked}
            onClick={() => isUnlocked && onSelect(idx)}
            title={lvl.label}
            className={`w-[34px] h-[34px] rounded-[10px] text-[13px] font-bold border transition-transform duration-150
              ${
                isActive
                  ? "bg-gradient-to-br from-flare to-pop border-transparent text-paper shadow-[0_4px_14px_rgba(255,0,110,0.4)]"
                  : "bg-white/5 border-white/10 text-mist hover:-translate-y-0.5"
              }
              ${!isUnlocked ? "opacity-35 cursor-not-allowed hover:translate-y-0" : "cursor-pointer"}
            `}
          >
            {isUnlocked ? lvl.id : "🔒"}
          </button>
        );
      })}
    </div>
  );
}
