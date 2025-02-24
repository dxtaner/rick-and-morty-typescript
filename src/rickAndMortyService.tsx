import axios from "axios";

const API_URL = "https://rickandmortyapi.com/api";

export async function getCharacters(): Promise<CharacterData> {
  try {
    const response = await axios.get(`${API_URL}/character`);
    return response.data;
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
}

export const getCharacterById = async (id: number): Promise<Character> => {
  try {
    const response = await axios.get(`${API_URL}/character/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching character with id ${id}:`, error);
    throw error;
  }
};

export const getLocations = async (): Promise<Location[]> => {
  try {
    const response = await axios.get(`${API_URL}/location`);
    return response.data;
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
};

export const getLocationById = async (id: number): Promise<Location> => {
  try {
    const response = await axios.get(`${API_URL}/location/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching location with id ${id}:`, error);
    throw error;
  }
};

export const getEpisodes = async (): Promise<Episode[]> => {
  try {
    const response = await axios.get(`${API_URL}/episode`);
    return response.data;
  } catch (error) {
    console.error("Error fetching episodes:", error);
    throw error;
  }
};

export const getEpisodeById = async (id: number): Promise<Episode> => {
  try {
    const response = await axios.get(`${API_URL}/episode/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching episode with id ${id}:`, error);
    throw error;
  }
};
