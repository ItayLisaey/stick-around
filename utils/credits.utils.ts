import { Credits } from '../types/movies.interface';

export function shouldWait(credits: Credits | undefined) {
    if (credits) {
        if (credits.after > 0 || credits.during > 0) {
            return 1;
        } else if (credits.after < 0 && credits.during < 0) {
            return -1;
        } else {
            return 0;
        }
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
