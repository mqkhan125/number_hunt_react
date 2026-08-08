import { useState } from "react";
import StartScreen from "./components/StartScreen";
import NumberGuessGame from "./components/NumberGuessGame";
import QuickPlayGame from "./components/QuickPlayGame";

// Tracks which screen is visible: "menu", "journey", or "quickplay"
function App() {
  const [screen, setScreen] = useState("menu");

  if (screen === "journey") {
    return <NumberGuessGame onBack={() => setScreen("menu")} />;
  }

  if (screen === "quickplay") {
    return <QuickPlayGame onBack={() => setScreen("menu")} />;
  }

  return (
    <StartScreen
      onJourney={() => setScreen("journey")}
      onQuickPlay={() => setScreen("quickplay")}
    />
  );
}

export default App;
