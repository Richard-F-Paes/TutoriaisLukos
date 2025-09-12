import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TutorialProvider } from "./contexts/TutorialContext";
import TutorialPage from "./pages/TutorialPage";
import McpDemoPage from "./pages/McpDemoPage";
import AdminPage from "./pages/AdminPage";
import NavMenu from "./components/NavMenu/NavMenu";
import "./styles.css";

function App() {
  return (
    <Router>
      <TutorialProvider>
        <div className="flex flex-col min-h-screen">
          <NavMenu />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<TutorialPage />} />
              <Route path="/mcp-demo" element={<McpDemoPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>
        </div>
      </TutorialProvider>
    </Router>
  );
}

export default App;
