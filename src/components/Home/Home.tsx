import React from "react";
import { Link } from "react-router-dom";
import rickImage from "../../assets/rick.png";
import mortyImage from "../../assets/morty.png";
import portalImage from "../../assets/portal.png";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h2 className="home-title">Welcome to Rick and Morty App</h2>
      <p className="home-description">
        This is the home page of the Rick and Morty application. You can
        navigate through the following sections:
      </p>
      <ul className="home-sections">
        <li className="home-section">
          <Link to="/characters" className="home-link">
            <img src={rickImage} alt="Rick" className="character-image" />
            <span className="section-title">Characters</span>
          </Link>
        </li>
        <li className="home-section">
          <Link to="/locations" className="home-link">
            <img src={mortyImage} alt="Morty" className="character-image" />
            <span className="section-title">Locations</span>
          </Link>
        </li>
        <li className="home-section">
          <Link to="/episodes" className="home-link">
            <img src={portalImage} alt="Portal" className="character-image" />
            <span className="section-title">Episodes</span>
          </Link>
        </li>
      </ul>
      <p className="home-message">
        Enjoy exploring the Rick and Morty universe!
      </p>
    </div>
  );
};

export default Home;
