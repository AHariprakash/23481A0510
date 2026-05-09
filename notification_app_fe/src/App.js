import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./page/HomePage";
import PriorityPage from "./page/PriorityPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/priority" element={<PriorityPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;