# 🔢 Number Hunt

> A sleek, mobile-first number guessing game built with **React 19**, **Vite**, and **Tailwind CSS v4**.

![React 19](https://img.shields.io/badge/React-19-blue.svg)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)
---
## 📸 Preview
<img width="428" height="374" alt="game-2" src="https://github.com/user-attachments/assets/c8ed8240-59c7-4099-9c32-e6621bd081b7" />

<img width="400" height="372" alt="game-1" src="https://github.com/user-attachments/assets/f484922c-86af-44a5-8334-d1dfa045b93a" />

<img width="446" height="368" alt="game" src="https://github.com/user-attachments/assets/9b9b0fc2-4f61-4579-abf1-9c07e058c57d" />
---

## 🎮 Overview

**Number Hunt** is an interactive, fast-paced number guessing game. Players try to uncover a secret hidden number within a given range using logic and directional feedback (`↑ Higher` / `↓ Lower`) before running out of attempts.

The app features two full game modes, procedural sound effects generated via Web Audio API, personal best tracking in `localStorage`, dynamic attempt bars, and vibrant confetti victory animations.

---

## ✨ Features

- 🗺️ **Journey Mode:** 10 levels with progressive difficulty scaling (ranges from 1–50 up to 1–200).
- ⚡ **Quick Play:** Direct access to Easy, Medium, and Hard difficulties without level unlocks.
- 🔊 **Procedural Web Audio:** Custom sound effects built using browser AudioContext (no heavy sound assets required).
- 🏆 **Personal Bests:** Tracks best attempt records per level in `localStorage`.
- 📱 **Mobile-First & Touch-Optimized:** Designed specifically for responsive layouts across mobile, tablet, and desktop viewports.
- 🎬 **Animations & FX:** Smooth CSS transitions, shake effects on wrong guesses, and celebration particle confetti.
- 🌙 **Modern Glassmorphic Dark UI:** Built with Tailwind CSS v4 design tokens and sleek UI elements.

---

## 📊 Game Modes & Rules

### 1. Journey Mode
Unlock sequential levels by successfully guessing the hidden number within the attempt limit.

| Level | Name | Range | Max Attempts |
| :---: | :--- | :---: | :----------: |
| **1** | Rookie | 1–50 | 15 |
| **2** | Easy | 1–60 | 13 |
| **3** | Casual | 1–70 | 12 |
| **4** | Steady | 1–80 | 11 |
| **5** | Sharp | 1–90 | 10 |
| **6** | Skilled | 1–100 | 9 |
| **7** | Expert | 1–120 | 8 |
| **8** | Master | 1–150 | 7 |
| **9** | Elite | 1–180 | 6 |
| **10** | Legend | 1–200 | 5 |

### 2. Quick Play Mode
Jump right into gameplay with instant difficulty options:

| Difficulty | Range | Max Attempts |
| :--- | :---: | :----------: |
| **Easy** | 1–50 | 10 |
| **Medium** | 1–100 | 8 |
| **Hard** | 1–200 | 6 |

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── AttemptsBar.jsx       # Dynamic color-coded progress bar
│   ├── BackButton.jsx        # Navigation header button
│   ├── Confetti.jsx          # Particle win celebration
│   ├── GuessHistory.jsx      # Scrollable guess history with directional hints
│   ├── HowToPlay.jsx         # Game instructions modal
│   ├── LevelLadder.jsx       # Journey mode level progression grid
│   ├── NumberGuessGame.jsx   # Core Journey mode engine & UI
│   ├── QuickPlayGame.jsx     # Quick Play mode launcher & UI
│   ├── SoundToggle.jsx       # Mute/unmute procedural audio toggle
│   └── StartScreen.jsx       # Main landing menu and mode selector
├── data/
│   ├── levels.js             # Journey mode config data
│   └── quickPlay.js          # Quick Play mode config data
├── utils/
│   ├── bestScores.js         # LocalStorage persistence wrapper
│   └── sound.js              # Web Audio API sound synthesizer engine
├── App.jsx                   # Primary state router & view container
├── index.css                 # Tailwind v4 import directives & custom keyframes
└── main.jsx                  # React DOM entry point
