import React from "react";
import { TutorialProvider } from "./contexts/TutorialContext";
import TutorialPage from "./pages/TutorialPage";
import "./styles.css";

function App() {
  return (
    <TutorialProvider>
      <TutorialPage />
    </TutorialProvider>
  );
}

export default App;
