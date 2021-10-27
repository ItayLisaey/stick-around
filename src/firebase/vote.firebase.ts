import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'; 
import { db } from '../App';
import { Vote } from '../types/movies.interface';


export async function fireVote(movieIndex: number, vote: Vote) {
    const movieRef = doc(db, 'movie-data', movieIndex.toString());
    const docSnap = await getDoc(movieRef);
    const currentVotes = {
        after: docSnap.get('after'),
        during: docSnap.get('during'),
    };

    if (docSnap.exists()) {
            await updateDoc(movieRef, {
                after: (currentVotes.after + vote.after),
                during: (currentVotes.during + vote.during),
             });
    } else {
        await setDoc(movieRef, {
            after: vote.after,
            during: vote.during
        });

}
}