import { doc, getDoc } from 'firebase/firestore';
import { db } from '../App';

export async function getVotingScore(movieIndex: number) {
  const movieRef = doc(db, 'movie-data', movieIndex.toString());
  const docSnap = await getDoc(movieRef);
  const currentVotes = {
    after: docSnap.get('after') ?? 0,
    during: docSnap.get('during') ?? 0,
  };

  return currentVotes;
}
