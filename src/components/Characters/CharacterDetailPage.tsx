import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCharacterById } from "../../rickAndMortyService";
import "./CharactersDetails.css";

interface CharacterDetail {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
}

interface Episode {
  id: number;
  name: string;
  url: string;
}

const CharacterDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<CharacterDetail | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const characterData = await getCharacterById(parseInt(id));
        setCharacter(characterData);
        const episodesData = await Promise.all(
          characterData.episode.map(async (episodeUrl) => {
            const response = await fetch(episodeUrl);
            const episodeData = await response.json();
            return {
              id: episodeData.id,
              name: episodeData.name,
              url: episodeUrl,
            };
          })
        );
        setEpisodes(episodesData);
      } catch (error) {
        console.error("Error fetching character:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (!character) {
    return <div className="character-container">Character not found!</div>;
  }

  return (
    <div className="character-details">
      <div className="character-info">
        <h2>{character.name}</h2>
        <img src={character.image} alt={character.name} />
        <p>Status: {character.status}</p>
        <p>Species: {character.species}</p>
        <p>Gender: {character.gender}</p>
        <p>
          Origin:{" "}
          <Link to={`/locations/${extractId(character.origin.url)}`}>
            {character.origin.name}
          </Link>
        </p>
        <p>
          Location:{" "}
          <Link to={`/locations/${extractId(character.location.url)}`}>
            {character.location.name}
          </Link>
        </p>
      </div>
      <div className="episode-info">
        <h3>Episodes:</h3>
        <ul>
          {episodes.map((episode) => (
            <li key={episode.id}>
              <Link to={`/episodes/${extractId(episode.url)}`}>
                {episode.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const extractId = (url: string) => {
  const id = url.split("/").pop();
  return id || "";
};

export default CharacterDetailPage;
