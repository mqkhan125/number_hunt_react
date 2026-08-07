# Number Hunt — 10-Level Guessing Game

A number guessing game with 10 progressively harder levels, built with
React, Vite, and Tailwind CSS.

## How it works

- Each level has a wider number range and fewer attempts than the last
  (Level 1: guess 1-50 in 15 tries -> Level 10: guess 1-200 in 4 tries).
- Winning a level unlocks the next one on the level ladder.
- Guess history and an attempts progress bar are shown live.
- Confetti plays on a win.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints in your terminal.

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  data/
    levels.js              # level definitions (range, attempts, label)
  components/
    NumberGuessGame.jsx     # main game logic and layout
    LevelLadder.jsx         # level selector row
    AttemptsBar.jsx         # attempts progress bar
    GuessHistory.jsx        # recent guesses chips
    Confetti.jsx             # win animation
  App.jsx
  main.jsx
  index.css                 # Tailwind entry + custom theme tokens
```

## Tech stack

- React 19
- Vite
- Tailwind CSS v4 (via `@tailwindcss/vite`)
