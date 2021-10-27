import { API_INDEX } from '../constants/api.constants';

function pathIndex(index: string | undefined) {
  switch (index) {
    case 'movie':
      return API_INDEX.MOVIES;
    case 'image':
      return API_INDEX.IMAGES;
    case 'image-hd':
      return API_INDEX.HDIMAGES;
    default:
      return API_INDEX.default;
  }
}

export function apiUrl(
  parameters?: string[],
  path?: string,
  index?: 'movie' | 'image' | 'image-hd'
) {
  const key = import.meta.env.VITE_TMDB_KEY;
  const mainPath = pathIndex(index);

  let params = '';
  const additionalParams = '';
  if (parameters) {
    params = `&${parameters.join('&')}`;
  }

  return `${mainPath}${path}?api_key=${key}${params}`;
}
