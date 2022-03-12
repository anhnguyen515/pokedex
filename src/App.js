import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PokemonDetail from "./pages/PokemonDetail";

function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:slug" element={<PokemonDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
