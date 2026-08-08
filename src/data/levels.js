export const LEVELS = [
  { id: 1, attempts: 15, range: 50, label: "Rookie" },
  { id: 2, attempts: 13, range: 60, label: "Easy" },
  { id: 3, attempts: 12, range: 70, label: "Casual" },
  { id: 4, attempts: 11, range: 80, label: "Steady" },
  { id: 5, attempts: 10, range: 90, label: "Sharp" },
  { id: 6, attempts: 9, range: 100, label: "Skilled" },
  { id: 7, attempts: 8, range: 120, label: "Expert" },
  { id: 8, attempts: 7, range: 150, label: "Master" },
  { id: 9, attempts: 6, range: 180, label: "Elite" },
  { id: 10, attempts: 5, range: 200, label: "Legend" },
];

export function randInRange(max) {
  return Math.floor(Math.random() * max) + 1;
}
