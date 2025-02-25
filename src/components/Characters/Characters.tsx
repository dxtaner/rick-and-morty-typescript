import React, { useEffect, useState, useRef } from "react";
import { getCharacters } from "../../rickAndMortyService";
import Card from "../Card/Card";
import "./Characters.css";

interface Character {
  id: number;
  name: string;
  image: string;
}

const Characters: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastCharacterElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchCharacters();
  }, []);

  useEffect(() => {
    setFilteredCharacters(
      characters.filter((character) =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, characters]);

  useEffect(() => {
    if (!loading && nextPage) {
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMoreCharacters();
        }
      });
      if (lastCharacterElementRef.current)
        observer.current.observe(lastCharacterElementRef.current);
      return () => {
        if (observer.current) observer.current.disconnect();
      };
    }
  }, [loading, nextPage]);

  const fetchCharacters = async () => {
    setLoading(true);
    try {
      const charactersData = await getCharacters();
      setCharacters(charactersData.results);
      setNextPage(charactersData.info.next);
    } catch (error) {
      console.error("Error fetching characters:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreCharacters = async () => {
    setLoading(true);
    try {
      const response = await fetch(nextPage!);
      const newData = await response.json();
      setCharacters((prevCharacters) => [
        ...prevCharacters,
        ...newData.results,
      ]);
      setNextPage(newData.info.next);
    } catch (error) {
      console.error("Error loading more characters:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setFilteredCharacters(
      characters.filter((character) =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  return (
    <div className="characters-container">
      <h2 className="title">Characters</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search characters..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
      {filteredCharacters.length === 0 ? (
        <div className="error-message">No results found for "{searchTerm}"</div>
      ) : (
        <div className="card-container">
          {filteredCharacters.map((character, index) => (
            <div
              key={character.id}
              ref={
                index === filteredCharacters.length - 1
                  ? lastCharacterElementRef
                  : null
              }>
              <Card character={character} />
            </div>
          ))}
        </div>
      )}
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default Characters;
