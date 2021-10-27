import { apiUrl } from '../api/url.api';
import { API_INDEX } from '../constants/api.constants';
import { getVotingScore } from '../firebase/results.firebase';
import { Credits, Movie } from '../types/movies.interface';

export async function afterCreditsCheck(movie: Movie) {
    const credits = {
        after: {
            votes: 0,
            boolean: false,
            fromAPI: false,
        },
        during: {
            votes: 0,
            boolean: false,
            fromAPI: false,
        },
    };

    const { id } = movie;
    const url = apiUrl([], `${id}/keywords`, 'movie');

    const response = await fetch(url).then((res) => res.json());

    response.keywords.map((keyword: { id: number }) => {
        if (keyword.id === API_INDEX.DURING_STINGER) {
            credits.during.boolean = true;
            credits.during.fromAPI = true;
        }
        if (keyword.id === API_INDEX.AFTER_STINGER) {
            credits.after.boolean = true;
            credits.after.fromAPI = true;
        }
    });

    const votingScore = await getVotingScore(movie.id);

    if (votingScore.after !== 0) {
        if (votingScore.after > 0) {
            credits.after = {
                votes: votingScore.after,
                boolean: true,
                fromAPI: false,
            };
        } else {
            credits.after = {
                votes: votingScore.after,
                boolean: false,
                fromAPI: false,
            };
        }
    }

    if (votingScore.during !== 0) {
        if (votingScore.during > 0) {
            credits.during = {
                votes: votingScore.during,
                boolean: true,
                fromAPI: false,
            };
        } else {
            credits.during = {
                votes: votingScore.during,
                boolean: false,
                fromAPI: false,
            };
        }
    }

    return credits;
}

export function shouldWait(credits: Credits | undefined) {
    if (credits) {
        if (credits.during.votes === 0 && credits.after.votes === 0) {
            if (!credits.after.fromAPI && !credits.during.fromAPI) {
                return 0;
            } else {
                return 1;
            }
        }

        if (credits.after.boolean || credits.during.boolean) {
            return 1;
        } else {
            return -1;
        }
    } else {
        return 0;
    }
}

export function waitingText(score: 1 | 0 | -1) {
    switch (score) {
        case 1:
            return 'YES';
        case -1:
            return 'NO';
        case 0:
            return 'MAYBE';
        default:
            return 'MAYBE';
    }
}
