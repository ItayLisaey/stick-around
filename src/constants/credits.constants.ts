import { Credits, CreditsData } from '../types/movies.interface';

export const emptyCredits: Credits = {
    during: 0,
    after: 0,
    trust: 4,
    total: 0,
};

export const emptyCreditsData: CreditsData = {
    movie: emptyCredits,
    vote: {
        during: false,
        after: false,
    },
};

export const TRUST_MESSAGES = {
    Certified: 'Certified Results',
    Users: 'These results rely on user votes and therefore may not be accurate',
    TMDB: 'These results rely on the TMDB Database and have not yet been confirmed by our users',
    '404': 'No information',
};
