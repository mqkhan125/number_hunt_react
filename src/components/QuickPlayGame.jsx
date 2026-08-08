import { useState, useRef, useEffect } from "react";
import { QUICK_PLAY } from "../data/quickPlay";
import { randInRange } from "../data/levels";
import AttemptsBar from "./AttemptsBar";
import GuessHistory from "./GuessHistory";
import Confetti from "./Confetti";
import BackButton from "./BackButton";
import SoundToggle from "./SoundToggle";
import { playCorrect, playWrong, playClick } from "../utils/sound";
import { getBest, trySaveBest } from "../utils/bestScores";

// Quick Play has two sub-screens:
//   1. Difficulty picker (difficulty === null)
//   2. The actual game (difficulty is set)

export default function QuickPlayGame({ onBack }) {
  const [difficulty, setDifficulty] = useState(null);
  const [target, setTarget] = useState(null);
  const [attemptsLeft, setAttemptsLeft] = useState(0);
  const [guessValue, setGuessValue] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | playing | won | lost
  const [history, setHistory] = useState([]);
  const [shake, setShake] = useState(false);
  const [newBest, setNewBest] = useState(false);
  const inputRef = useRef(null);

  // The config for the currently selected difficulty (null if none chosen)
  const config = difficulty
    ? QUICK_PLAY.find((d) => d.id === difficulty)
    : null;
  const bestScore = config ? getBest(`quickplay-${config.id}`) : null;

  // Auto-focus the input when a game starts
  useEffect(() => {
    if (status === "playing") inputRef.current?.focus();
  }, [status, difficulty]);

  function startGame(diffId) {
    playClick();
    const cfg = QUICK_PLAY.find((d) => d.id === diffId);
    setDifficulty(diffId);
    setTarget(randInRange(cfg.range));
    setAttemptsLeft(cfg.attempts);
    setGuessValue("");
    setHistory([]);
    setStatus("playing");
    setMessage(`Guess a number between 1 and ${cfg.range}`);
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

    if (isNaN(guess) || guess < 1 || guess > config.range) {
      setMessage(`Enter a valid number between 1 and ${config.range}`);
      triggerShake();
      return;
    }

    const remaining = attemptsLeft - 1;
    const isCorrect = guess === target;
    const direction =
      guess < target ? "low" : guess > target ? "high" : "exact";

    // Keep only the 6 most recent guesses visible
    setHistory((h) => [...h, { guess, direction }].slice(-6));

    if (isCorrect) {
      setAttemptsLeft(remaining);
      setStatus("won");
      // attemptsUsed = total attempts minus whatever's left
      const attemptsUsed = config.attempts - remaining;
      const isNewBest = trySaveBest(`quickplay-${config.id}`, attemptsUsed);
      setNewBest(isNewBest);
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

  // ── Difficulty picker sub-screen ──
  if (!difficulty) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center p-6 bg-[radial-gradient(circle_at_15%_10%,#241a3d_0%,#140e26_55%,#0b0718_100%)] font-sans">
        <div className="w-full max-w-[440px] flex flex-col items-center gap-4">
          <div className="w-full flex justify-between items-center">
            <BackButton onBack={onBack} />
            <SoundToggle />
          </div>

          <div className="w-full bg-ink-800 border border-white/8 rounded-[20px] p-8 shadow-[0_24px_60px_rgba(0,0,0,0.5)] animate-pop-in">
            <h1 className="text-[26px] font-extrabold text-paper tracking-tight text-center">
              Quick Play
            </h1>
            <p className="text-sm text-mist text-center mt-2 mb-6">
              Choose your challenge
            </p>

            <div className="flex flex-col gap-3">
              {QUICK_PLAY.map((diff) => {
                const best = getBest(`quickplay-${diff.id}`);
                return (
                  <button
                    key={diff.id}
                    onClick={() => startGame(diff.id)}
                    className="w-full p-4 rounded-[14px] border border-white/10 bg-white/4 cursor-pointer hover:bg-white/8 hover:border-cool/30 transition-all duration-150 text-left"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-[15px] font-bold text-paper">
                          {diff.label}
                        </span>
                        <span className="text-xs text-mist ml-2">
                          1–{diff.range} · {diff.attempts} tries
                        </span>
                      </div>
                      {best !== null && (
                        <span className="text-[11px] font-bold text-flare-2 bg-flare-2/10 rounded-full px-2 py-0.5">
                          Best: {best}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Active game sub-screen ──
  return (
    <div className="min-h-screen w-full flex justify-center items-center p-6 bg-[radial-gradient(circle_at_15%_10%,#241a3d_0%,#140e26_55%,#0b0718_100%)] font-sans">
      <div className="w-full max-w-[440px] flex flex-col items-center gap-4">
        {/* Top bar with back, label, and sound */}
        <div className="w-full flex justify-between items-center">
          <BackButton
            onBack={() => {
              playClick();
              setDifficulty(null);
            }}
          />
          <div className="text-xs font-bold text-cool bg-cool/10 border border-cool/20 rounded-full px-3 py-1.5">
            {config.label} · Quick Play
          </div>
          <SoundToggle />
        </div>

        <div
          className={`relative w-full bg-ink-800 border border-white/8 rounded-[20px] p-8 shadow-[0_24px_60px_rgba(0,0,0,0.5)] overflow-hidden ${
            shake ? "animate-shake" : "animate-pop-in"
          }`}
        >
          {status === "won" && <Confetti />}

          <div className="flex justify-between items-start mb-5">
            <div>
              <span className="text-[11px] font-bold tracking-[0.1em] text-cool">
                QUICK PLAY · {config.label.toUpperCase()}
              </span>
              <h1 className="mt-1 text-[26px] font-extrabold text-paper tracking-tight">
                Number Hunt
              </h1>
            </div>
            <div className="text-[13px] font-bold text-[#e8e2f5] bg-white/7 border border-white/10 rounded-full px-3 py-1.5 whitespace-nowrap">
              1–{config.range}
            </div>
          </div>

          {/* Personal best badge (only shows if a previous best exists) */}
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
            totalAttempts={config.attempts}
          />

          {status === "playing" ? (
            <>
              <div className="flex gap-2.5 mb-3.5">
                <input
                  ref={inputRef}
                  type="number"
                  min={1}
                  max={config.range}
                  value={guessValue}
                  onChange={(e) => setGuessValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`1 – ${config.range}`}
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

              <button
                onClick={() => startGame(difficulty)}
                className="px-5 py-3 text-[15px] font-bold text-ink-950 rounded-xl cursor-pointer bg-gradient-to-r from-flare-2 to-flare transition-transform duration-150 hover:brightness-110 hover:-translate-y-0.5"
              >
                Play Again
              </button>

              <button
                onClick={() => {
                  playClick();
                  setDifficulty(null);
                }}
                className="w-full py-2.5 text-[13px] font-semibold text-mist bg-white/5 border border-white/10 rounded-[10px] cursor-pointer transition-colors duration-150 hover:bg-ink-600"
              >
                Change Difficulty
              </button>
            </div>
          )}
s
          {history.length > 0 && status === "playing" && (
            <GuessHistory history={history} />
          )}
        </div>
      </div>
    </div>
  );
}
