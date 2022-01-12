import { emptyCredits } from '../../constants/credits.constants';
import { creditType, CreditsData } from '../../types/movies.interface';
import { getBackendURL } from '../../utils/api.utils';

export async function getMovieCredits(movieId: number, device: string) {
    const defaultData: CreditsData = {
        movie: emptyCredits,
        vote: {
            during: false,
            after: false,
        },
    };

    const url = new URL(`${getBackendURL()}/movies/${movieId}`);
    const params = {
        device: device,
    };
    url.search = new URLSearchParams(params).toString();

    try {
        const res = await fetch(url.toString());
        const data = await res.json();

        if (data.success) {
            return {
                movie: data.movie,
                vote: data.vote,
            } as CreditsData;
        } else if (res.status === 404) {
            return {
                movie: data.movie,
                vote: data.vote,
            } as CreditsData;
        } else {
            return defaultData;
        }
    } catch (err) {
        return defaultData;
    }
}

export async function fireVote(
    movieIndex: number,
    type: creditType,
    content: boolean,
    device: string
): Promise<boolean> {
    const url = new URL(`${getBackendURL()}/vote/${movieIndex}`);
    const params = {
        vote: content ? 'true' : 'false',
        type: type,
        device: device,
    };
    url.search = new URLSearchParams(params).toString();
    const response = await fetch(url.toString(), {
        credentials: 'include',
        method: 'POST',
    }).then((res) => res.json());

    if (response.success) {
        return true;
    } else {
        return false;
    }
}

// export async function handleVoteAuth(
//     movieIndex: number,
//     type: creditType,
//     content: boolean
// ): Promise<boolean> {
//     const res = await fireVote(movieIndex, type, content);
//     if (!res) {
//         const authRes = authenticate();
//         if (!authRes) {
//             return false;
//         } else {
//             const secondTry = await fireVote(movieIndex, type, content);
//             if (secondTry) {
//                 await registerVote(movieIndex, type);
//                 return true;
//             } else {
//                 return false;
//             }
//         }
//     } else {
//         await registerVote(movieIndex, type);
//         console.log('trying to register vote');

//         return res;
//     }
// }
