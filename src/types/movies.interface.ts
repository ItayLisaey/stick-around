export interface Movie {
    id: number;
    title: string;
    releaseDate: Date;
    overview: string;
    posterPath: string;
}

export interface SubCredits {
    votes: number;
    boolean: boolean;
    fromAPI: boolean;
}

export interface Credits {
    during: number;
    after: number;
    trust: Trust;
    total: number;
}

export type creditType = 'during' | 'after';

export interface Vote {
    during: boolean;
    after: boolean;
}

export type Trust = 1 | 2 | 3 | 4;
