import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEpisodeById, getCharacterById } from "../../rickAndMortyService";
import Card from "../Card/Card";
import "./EpisodeDetailPage.css";

interface Episode {
  id: number;
  name: string;
  episode: string;
  air_date: string;
  characters: string[];
}

interface Character {
  id: number;
  name: string;
  image: string;
}

const EpisodeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        const episodeData = await getEpisodeById(parseInt(id));
        setEpisode(episodeData);

        const charactersData: Character[] = await Promise.all(
          episodeData.characters.map(async (characterUrl: string) => {
            const characterId = characterUrl.split("/").pop();
            return await getCharacterById(parseInt(characterId!));
          })
        );
        setCharacters(charactersData);
      } catch (error) {
        console.error("Error fetching episode:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisode();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!episode) {
    return <div>Episode not found!</div>;
  }

  return (
    <div className="episode-details">
      <h2 className="episode-header">{episode.name}</h2>
      <div className="episode-info">
        <p>Episode: {episode.episode}</p>
        <p>Air Date: {episode.air_date}</p>
      </div>
      <div className="character-list">
        <h3>Characters</h3>
        <div className="card-container">
          {characters.map((character) => (
            <Card key={character.id} character={character}></Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EpisodeDetailPage;
