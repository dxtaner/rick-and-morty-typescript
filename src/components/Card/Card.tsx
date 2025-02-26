import React from "react";
import { Link } from "react-router-dom";

import "./Card.css";

interface Character {
  id: number;
  name: string;
  image: string;
}

interface CardProps {
  character: Character;
}

const Card: React.FC<CardProps> = ({ character }) => {
  return (
    <div className="card">
      <Link to={`/characters/${character.id}`} className="card-link">
        <img
          src={character.image}
          alt={character.name}
          className="card-image"
        />
        <h3 className="card-title">{character.name}</h3>
      </Link>
    </div>
  );
};

export default Card;
