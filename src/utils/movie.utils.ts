
export function parseMovieDate(date: string) {
    const newDate = new Date(Date.parse(date));
    return newDate;
}

