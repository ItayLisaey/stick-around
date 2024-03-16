import axios from "axios";
import { API_INDEX } from "../../constants/api.constants";

export const TMDBPath = {
  movie: API_INDEX.MOVIES,
  image: API_INDEX.IMAGES,
  imageHD: API_INDEX.HDIMAGES,
};

const tmdbKey = () => {
  const key = process.env.EXPO_PUBLIC_TMDB_KEY;
  if (!key) {
    throw new Error("TMDB key undetected");
  }
  return key as string;
};

export const tmdbAxiosInstance = axios.create({
  baseURL: API_INDEX.default,
});

export const TMDBInstance = async () => {
  tmdbAxiosInstance.defaults.params = {
    api_key: tmdbKey(),
  };

  return tmdbAxiosInstance;
};
