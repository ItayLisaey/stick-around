
export interface Movie {
    id: number;
    title: string;
    releaseDate: Date;
    overview: string;
    posterPath: string;
}


export interface SubCredits {
    votes: number,
    boolean: boolean,
    fromAPI: boolean
}

export interface Credits {
    during: SubCredits,
    after: SubCredits
}

export type creditType = 'during' | 'after'

export interface Vote {
    during: 1 | 0 | -1,
    after: 1 | 0 | -1
}