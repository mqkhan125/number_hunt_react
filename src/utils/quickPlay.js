// Quick Play difficulty configurations.
// Range and attempts are chosen to feel distinct from each other
// while staying balanced and fun:
//   Easy   — generous attempts, small range  (good for warming up)
//   Medium — tighter attempts, medium range  (the "standard" challenge)
//   Hard   — few attempts, wide range       (comparable to late Journey levels)

export const QUICK_PLAY = [
  { id: "easy", label: "Easy", attempts: 10, range: 50 },
  { id: "medium", label: "Medium", attempts: 8, range: 100 },
  { id: "hard", label: "Hard", attempts: 6, range: 200 },
];
