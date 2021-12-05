import { emptyCredits } from '../../constants/credits.constants';
import { Credits, creditType } from '../../types/movies.interface';
import { registerVote } from '../../utils/votes.utils';
import { authenticate } from './auth';
// const backend_url = import.meta.env.BACKEND;

export const backend_url =
    'https://stick-around-backend-ie7sxtuaoa-uc.a.run.app/api';
export async function getMovieCredits(movieId: number) {
    try {
        const response = await fetch(`${backend_url}/movies/${movieId}`)
            .then((res) => res.json())
            .catch((err) => err);

        if (response.success) {
            return response.data as Credits;
        } else {
            return emptyCredits;
        }
    } catch (err) {
        return emptyCredits;
    }
}

export async function fireVote(
    movieIndex: number,
    type: creditType,
    content: boolean
): Promise<boolean> {
    const base = `${backend_url}/vote`;
    const response = await fetch(
        `${base}/${type}/${movieIndex}/?vote=${content}`,
        {
            credentials: 'include',
            method: 'POST',
        }
    ).then((res) => res.json());

    if (response.success) {
        return true;
    } else {
        return false;
    }
}

export async function handleVoteAuth(
    movieIndex: number,
    type: creditType,
    content: boolean
): Promise<boolean> {
    const res = await fireVote(movieIndex, type, content);
    if (!res) {
        const authRes = authenticate();
        if (!authRes) {
            return false;
        } else {
            const secondTry = await fireVote(movieIndex, type, content);
            if (secondTry) {
                await registerVote(movieIndex, type);
                return true;
            } else {
                return false;
            }
        }
    } else {
        await registerVote(movieIndex, type);
        console.log('trying to register vote');

        return res;
    }
}
