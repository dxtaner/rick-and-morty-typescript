import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLocationById } from "../../rickAndMortyService";
import Card from "../Card/Card";
import "./LocationDetailPage.css";

interface LocationDetail {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
}

interface Character {
  id: number;
  name: string;
  image: string;
}

const LocationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [location, setLocation] = useState<LocationDetail | null>(null);
  const [residents, setResidents] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLocationAndResidents = async () => {
      try {
        const locationData = await getLocationById(parseInt(id));
        setLocation(locationData);

        const residentsData = await Promise.all(
          locationData.residents.map(async (residentUrl) => {
            const response = await fetch(residentUrl);
            const residentData = await response.json();
            return {
              id: residentData.id,
              name: residentData.name,
              image: residentData.image,
            };
          })
        );

        setResidents(residentsData);
      } catch (error) {
        console.error("Error fetching location:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocationAndResidents();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div>Loading...</div>
      </div>
    );
  }

  if (!location) {
    return (
      <div className="location-container">
        <div>Location not found!</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="location-details">
        <h2 className="location-name">{location.name}</h2>
        <div className="location-info">
          <p>
            <strong>Type:</strong> {location.type}
          </p>
          <p>
            <strong>Dimension:</strong> {location.dimension}
          </p>
        </div>
        <div className="resident-list">
          <h3>Characters</h3>
          <div className="card-container">
            {residents.map((resident) => (
              <Card key={resident.id} character={resident} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetailPage;
