import { apiUrl } from './url.api';

export function posterImageUrl(path: string) {
    return apiUrl([], path, 'image');
  }

  export function posterImageUrlHD(path: string) {
    return apiUrl([], path, 'image-hd');
  }