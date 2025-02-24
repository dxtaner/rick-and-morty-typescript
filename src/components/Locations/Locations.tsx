import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLocations } from "../../rickAndMortyService";
import "./Locations.css";

interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
}

const Locations: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    fetchLocations(currentPage);
  }, [currentPage]);

  const fetchLocations = async (page: number) => {
    setLoading(true);
    try {
      const locationsData = await getLocations(page);
      setLocations(locationsData.results);
      setTotalPages(locationsData.info.pages);
    } catch (error) {
      console.error("Error fetching locations:", error);
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
    <div className="locations-container">
      <h2 className="locations-title">Locations</h2>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div>
          <ul className="locations-list">
            {locations.map((location) => (
              <li key={location.id} className="location-item">
                <Link
                  to={`/locations/${location.id}`}
                  className="location-link">
                  <h3 className="location-name">{location.name}</h3>
                  <div className="location-details">
                    <p className="location-info">Type: {location.type}</p>
                    <p className="location-info">
                      Dimension: {location.dimension}
                    </p>
                  </div>
                </Link>
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

export default Locations;
