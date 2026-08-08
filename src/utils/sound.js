// Sound effects using the Web Audio API — no external libraries needed.
// All sounds are generated from simple oscillator tones.

let audioCtx = null;
let muted = true; // Muted by default per the requirements

// Lazily create the audio context (browsers require a user gesture first)
function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

export function isMuted() {
  return muted;
}

// Toggle mute on/off, returns the new state
export function toggleMute() {
  muted = !muted;
  return muted;
}

// Rising three-note chime for a correct guess
export function playCorrect() {
  if (muted) return;
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = "sine";

  // Play C5 → E5 → G5 in quick succession
  osc.frequency.setValueAtTime(523, ctx.currentTime);
  osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
  osc.frequency.setValueAtTime(784, ctx.currentTime + 0.2);

  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.5);
}

// Short low buzz for a wrong guess
export function playWrong() {
  if (muted) return;
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = "sawtooth";

  osc.frequency.setValueAtTime(200, ctx.currentTime);
  osc.frequency.setValueAtTime(150, ctx.currentTime + 0.15);

  gain.gain.setValueAtTime(0.07, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.25);
}

// Tiny click for button presses
export function playClick() {
  if (muted) return;
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = "sine";

  osc.frequency.setValueAtTime(800, ctx.currentTime);
  gain.gain.setValueAtTime(0.04, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.06);
}
