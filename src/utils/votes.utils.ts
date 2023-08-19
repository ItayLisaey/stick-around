import { Preferences } from '@capacitor/preferences';
import { creditType } from '../types/movies.interface';

export async function registerVote(id: number, type: creditType) {
    const movieVote = await Preferences.get({ key: `${id}` });

    if (movieVote.value) {
        const voteStatus: { after: boolean; during: boolean } =
            movieVote.value && JSON.parse(movieVote.value);
        // const newStatus = (voteStatus[type] = true);
        await Preferences.set({
            key: `${id}`,
            value: JSON.stringify(voteStatus, null, 2),
        });
    } else {
        const newStatus =
            type === 'after'
                ? { after: true, during: false }
                : { after: false, during: true };
        await Preferences.set({
            key: `${id}`,
            value: JSON.stringify(newStatus, null, 2),
        });
    }
}

export async function hasVoted(id: number) {
    const { value } = await Preferences.get({ key: `${id}` });
    const voteStatus: { after: boolean; during: boolean } | null = value
        ? JSON.parse(value)
        : null;

    return voteStatus;
}
