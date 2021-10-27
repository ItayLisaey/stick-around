import { Storage } from '@capacitor/storage';
import { creditType, Movie, Vote } from '../types/movies.interface';

export function convertVote(type: creditType, boolean: boolean) {
  if (type === 'after') {
    return {
      after: boolean ? 1 : -1,
      during: 0,
    } as Vote;
  } else {
    return {
      after: 0,
      during: boolean ? 1 : -1,
    } as Vote;
  }
}

export async function registerVote(movie: Movie, type: creditType) {
  const movieVote = await Storage.get({ key: `${movie.id}` });

  if (movieVote.value) {
    const voteStatus: { after: boolean; during: boolean } =
      movieVote.value && JSON.parse(movieVote.value);
    const newStatus = (voteStatus[type] = true);
    await Storage.set({
      key: `${movie.id}`,
      value: JSON.stringify(voteStatus, null, 2),
    });
  } else {
    const newStatus =
      type === 'after'
        ? { after: true, during: false }
        : { after: false, during: true };
    const vote = await Storage.set({
      key: `${movie.id}`,
      value: JSON.stringify(newStatus, null, 2),
    });
  }
}

export async function hasVoted(movie: Movie) {
  const { value } = await Storage.get({ key: `${movie.id}` });
  const voteStatus: { after: boolean; during: boolean } | null = value
    ? JSON.parse(value)
    : null;

  return voteStatus;
}
