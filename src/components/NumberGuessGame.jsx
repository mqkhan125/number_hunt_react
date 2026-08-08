import { useState, useRef, useEffect } from "react";
import { LEVELS, randInRange } from "../data/levels";
import LevelLadder from "./LevelLadder";
import AttemptsBar from "./AttemptsBar";
import GuessHistory from "./GuessHistory";
import Confetti from "./Confetti";
import BackButton from "./BackButton";
import SoundToggle from "./SoundToggle";
import { playCorrect, playWrong, playClick } from "../utils/sound";
import { getBest, trySaveBest } from "../utils/bestScores";

export default function NumberGuessGame({ onBack }) {
  const [levelIndex, setLevelIndex] = useState(0);
  const [target, setTarget] = useState(() => randInRange(LEVELS[0].range));
  const [attemptsLeft, setAttemptsLeft] = useState(LEVELS[0].attempts);
  const [guessValue, setGuessValue] = useState("");
  const [message, setMessage] = useState(
    `Guess a number between 1 and ${LEVELS[0].range}`,
  );
  const [status, setStatus] = useState("playing");
  const [history, setHistory] = useState([]);
  const [unlockedLevel, setUnlockedLevel] = useState(1);
  const [shake, setShake] = useState(false);
  const [newBest, setNewBest] = useState(false);
  const inputRef = useRef(null);

  const level = LEVELS[levelIndex];
  const isLastLevel = levelIndex === LEVELS.length - 1;
  const bestScore = getBest(`journey-${level.id}`);

  useEffect(() => {
    inputRef.current?.focus();
  }, [levelIndex, status]);

  function startLevel(idx) {
    const lvl = LEVELS[idx];
    playClick();
    setLevelIndex(idx);
    setTarget(randInRange(lvl.range));
    setAttemptsLeft(lvl.attempts);
    setGuessValue("");
    setHistory([]);
    setStatus("playing");
    setMessage(`Guess a number between 1 and ${lvl.range}`);
    setNewBest(false);
  }

  function triggerShake() {
    setShake(true);
    setTimeout(() => setShake(false), 400);
  }

  function handleGuess() {
    if (status !== "playing") return;

    const guess = parseInt(guessValue, 10);
    setGuessValue("");

    if (isNaN(guess) || guess < 1 || guess > level.range) {
      setMessage(`Enter a valid number between 1 and ${level.range}`);
      triggerShake();
      return;
    }

    const remaining = attemptsLeft - 1;
    const isCorrect = guess === target;
    const direction =
      guess < target ? "low" : guess > target ? "high" : "exact";

    setHistory((h) => [...h, { guess, direction }].slice(-6));

    if (isCorrect) {
      setAttemptsLeft(remaining);
      setStatus("won");
      // Track personal best (attempts used = total - remaining)
      const attemptsUsed = level.attempts - remaining;
      const isNewBest = trySaveBest(`journey-${level.id}`, attemptsUsed);
      setNewBest(isNewBest);
      if (levelIndex + 1 > unlockedLevel && levelIndex + 1 < LEVELS.length) {
        setUnlockedLevel(levelIndex + 1);
      } else if (levelIndex === LEVELS.length - 1) {
        setUnlockedLevel(LEVELS.length);
      }
      setMessage(`Solved! The number was ${target}.`);
      playCorrect();
      return;
    }

    if (remaining <= 0) {
      setAttemptsLeft(0);
      setStatus("lost");
      setMessage(`Out of attempts. The number was ${target}.`);
      playWrong();
      return;
    }

    setAttemptsLeft(remaining);
    setMessage(guess < target ? "Too low — go higher" : "Too high — go lower");
    playWrong();
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleGuess();
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-center p-6 bg-[radial-gradient(circle_at_15%_10%,#241a3d_0%,#140e26_55%,#0b0718_100%)] font-sans">
      <div className="w-full max-w-[440px] flex flex-col items-center gap-4">
        {/* Navigation bar — back to menu + sound toggle */}
        <div className="w-full flex justify-between items-center">
          <BackButton onBack={onBack} />
          <SoundToggle />
        </div>

        <LevelLadder
          activeIndex={levelIndex}
          unlockedLevel={unlockedLevel}
          onSelect={startLevel}
        />

        <div
          className={`relative w-full bg-ink-800 border border-white/8 rounded-[20px] p-8 shadow-[0_24px_60px_rgba(0,0,0,0.5)] overflow-hidden ${
            shake ? "animate-shake" : "animate-pop-in"
          }`}
        >
          {status === "won" && <Confetti />}

          <div className="flex justify-between items-start mb-5">
            <div>
              <span className="text-[11px] font-bold tracking-[0.1em] text-flare">
                LEVEL {level.id} · {level.label}
              </span>
              <h1 className="mt-1 text-[26px] font-extrabold text-paper tracking-tight">
                Number Hunt
              </h1>
            </div>
            <div className="text-[13px] font-bold text-[#e8e2f5] bg-white/7 border border-white/10 rounded-full px-3 py-1.5 whitespace-nowrap">
              1–{level.range}
            </div>
          </div>

          {/* Show personal best for this level if one exists */}
          {bestScore !== null && (
            <div className="flex justify-center mb-3">
              <span className="text-[11px] font-bold text-flare-2 bg-flare-2/10 rounded-full px-3 py-1">
                Personal Best: {bestScore} attempt
                {bestScore !== 1 ? "s" : ""}
              </span>
            </div>
          )}

          <AttemptsBar
            attemptsLeft={attemptsLeft}
            totalAttempts={level.attempts}
          />

          {status === "playing" ? (
            <>
              <div className="flex gap-2.5 mb-3.5">
                <input
                  ref={inputRef}
                  type="number"
                  min={1}
                  max={level.range}
                  value={guessValue}
                  onChange={(e) => setGuessValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`1 – ${level.range}`}
                  className="flex-1 min-w-0 px-3.5 py-3 text-base rounded-xl border-2 border-white/12 bg-white/4 text-paper outline-none transition-colors duration-150 placeholder:text-mist-dim focus:border-flare focus:shadow-[0_0_0_4px_rgba(255,122,61,0.15)]"
                />
                <button
                  onClick={handleGuess}
                  className="px-5 py-3 text-[15px] font-bold text-ink-950 rounded-xl cursor-pointer whitespace-nowrap bg-gradient-to-r from-flare-2 to-flare transition-transform duration-150 hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0"
                >
                  Guess
                </button>
              </div>
              <p className="text-sm font-semibold text-mist text-center min-h-[20px] m-0">
                {message}
              </p>
            </>
          ) : (
            <div className="flex flex-col items-center gap-3 text-center">
              <p
                className={`text-[17px] font-bold my-1 ${
                  status === "won" ? "text-good" : "text-bad"
                }`}
              >
                {status === "won" ? "🎯 " : "💥 "}
                {message}
              </p>

              {newBest && (
                <p className="text-sm text-flare-2 font-bold m-0">
                  ⭐ New Personal Best!
                </p>
              )}

              {status === "won" && !isLastLevel && (
                <button
                  onClick={() => startLevel(levelIndex + 1)}
                  className="px-5 py-3 text-[15px] font-bold text-ink-950 rounded-xl cursor-pointer bg-gradient-to-r from-flare-2 to-flare transition-transform duration-150 hover:brightness-110 hover:-translate-y-0.5"
                >
                  Next Level →
                </button>
              )}

              {status === "won" && isLastLevel && (
                <p className="text-sm text-flare-2 font-bold m-0">
                  🏆 All 10 levels cleared. You're a Legend.
                </p>
              )}

              <button
                onClick={() => startLevel(levelIndex)}
                className="w-full py-2.5 text-[13px] font-semibold text-mist bg-white/5 border border-white/10 rounded-[10px] cursor-pointer transition-colors duration-150 hover:bg-ink-600"
              >
                Retry This Level
              </button>
            </div>
          )}

          {history.length > 0 && status === "playing" && (
            <GuessHistory history={history} />
          )}
        </div>

        <p className="text-xs text-mist-dim text-center m-0">
          Win a level to unlock the next. Fewer attempts, wider range as you
          climb.
        </p>
      </div>
    </div>
  );
}
