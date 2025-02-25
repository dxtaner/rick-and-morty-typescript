import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEpisodes } from "../../rickAndMortyService";
import "./Episodes.css";

interface Episode {
  id: number;
  name: string;
  episode: string;
  air_date: string;
}

const Episodes: React.FC = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    fetchEpisodes();
  }, [currentPage]);

  const fetchEpisodes = async () => {
    setLoading(true);
    try {
      const episodesData = await getEpisodes(currentPage);
      setEpisodes(episodesData.results);
      setTotalPages(episodesData.info.pages);
    } catch (error) {
      console.error("Error fetching episodes:", error);
    } finally {
      setLoading(false);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="episodes-container">
      <h2 className="episodes-title">Episodes</h2>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div>
          <ul className="episodes-list">
            {episodes.map((episode) => (
              <li key={episode.id} className="episode-item">
                <Link to={`/episodes/${episode.id}`} className="episode-link">
                  <h3 className="episode-name">{episode.name}</h3>
                </Link>
                <p className="episode-info">Episode: {episode.episode}</p>
                <p className="episode-info">Air Date: {episode.air_date}</p>
              </li>
            ))}
          </ul>
          <div className="pagination">
            <button onClick={prevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>{currentPage}</span>
            <button onClick={nextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Episodes;
