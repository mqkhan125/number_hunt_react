🔢 Number Hunt
A sleek, mobile-first number guessing game.

Built with React 19 · Vite · Tailwind CSS v4


React 19ViteTailwind v4MIT License

🎮 Overview
Guess the hidden number in as few attempts as possible. After each guess, you get a hint: go higher (↑) or lower (↓).

Number Hunt features two distinct modes designed for both progressive challenge and quick replayability.

✨ Features
🗺️ Journey Mode — 10 levels of increasing difficulty (1–50 to 1–200).
⚡ Quick Play — Jump straight into Easy, Medium, or Hard.
🔊 Sound Effects — Procedural audio via Web Audio API (muted by default).
🏆 Personal Bests — Automatically tracks your fewest attempts per level using localStorage.
📱 Mobile-First — Fully responsive and touch-optimized for small screens.
🎬 Smooth Animations — Pop-in, shake, and confetti (respects prefers-reduced-motion).
📊 Game Modes
Journey Mode
Beat a level to unlock the next one.

Level	Name	Range	Attempts
1	Rookie	1–50	15
2	Easy	1–60	13
3	Casual	1–70	12
4	Steady	1–80	11
5	Sharp	1–90	10
6	Skilled	1–100	9
7	Expert	1–120	8
8	Master	1–150	7
9	Elite	1–180	6
10	Legend	1–200	5
Quick Play
No progression — just pick a difficulty and play.

Difficulty	Range	Attempts
Easy	1–50	10
Medium	1–100	8
Hard	1–200	6
🚀 Getting Started
# Clone the repositorygit clone https://github.com/YOUR_USERNAME/number-hunt-react.git# Navigate to the directorycd number-hunt-react# Install dependenciesnpm install# Start the development servernpm run dev
📁 Project Structure

src/
├── components/
│   ├── AttemptsBar.jsx       # Color-coded attempts progress bar
│   ├── BackButton.jsx        # Reusable navigation button
│   ├── Confetti.jsx          # Win celebration particles
│   ├── GuessHistory.jsx      # Recent guesses with direction hints
│   ├── HowToPlay.jsx         # Rules & instructions modal
│   ├── LevelLadder.jsx       # Journey mode level selector
│   ├── NumberGuessGame.jsx   # Core Journey mode logic & UI
│   ├── QuickPlayGame.jsx     # Quick Play difficulty picker & game UI
│   ├── SoundToggle.jsx       # Mute/unmute sounds button
│   └── StartScreen.jsx       # Main menu / mode selection
├── data/
│   ├── levels.js             # Journey mode configurations
│   └── quickPlay.js          # Quick Play difficulty configurations
├── utils/
│   ├── bestScores.js         # localStorage wrapper for personal bests
│   └── sound.js              # Web Audio API sound generators
├── App.jsx                   # Root screen router
├── index.css                 # Tailwind imports, theme tokens, keyframes
└── main.jsx                  # React DOM entry point