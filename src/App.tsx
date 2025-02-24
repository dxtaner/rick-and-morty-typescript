import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home";
import Characters from "./components/Characters/Characters";
import Locations from "./components/Locations/Locations";
import Episodes from "./components/Episodes/Episodes";
import "./App.css";
import CharacterDetailPage from "./components/Characters/CharacterDetailPage";
import LocationDetailPage from "./components/Locations/LocationDetailPage";
import EpisodeDetailPage from "./components/Episodes/EpisodeDetailPage";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <nav className="nav-bar">
          <ul className="nav-list">
            <li>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/characters" className="nav-link">
                Characters
              </Link>
            </li>
            <li>
              <Link to="/locations" className="nav-link">
                Locations
              </Link>
            </li>
            <li>
              <Link to="/episodes" className="nav-link">
                Episodes
              </Link>
            </li>
          </ul>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/episodes" element={<Episodes />} />
            <Route path="/characters/:id" element={<CharacterDetailPage />} />
            <Route path="/locations/:id" element={<LocationDetailPage />} />
            <Route path="/episodes/:id" element={<EpisodeDetailPage />} />
          </Routes>
        </div>
      </div>
      <footer className="footer">
        <p>
          Follow me on <a href="https://github.com/dxtaner">GitHub</a> and{" "}
          <a href="https://www.linkedin.com/in/tanerozer16/">LinkedIn</a>
        </p>
        <p>&copy; 2025 dxtaner || All rights</p>
      </footer>
    </Router>
  );
};

export default App;
