import { CircularProgress, Zoom } from '@mui/material';
import { useEffect, useState } from 'react';
import { getSingleMovie } from '../../api/singleMovie';
import { MovieCard } from '../../components/MovieCard';
import { WaitingCard } from '../../components/WaitingCard';
import { Credits, Movie } from '../../types/movies.interface';
import { afterCreditsCheck } from '../../utils/credits.utils';
import classes from './movie-page.module.scss';

export interface MoviePageProps {
    id: string
}

export const MoviePage: React.VFC<MoviePageProps> = ({ id }) => {
    const [movie, setMovie] = useState<Movie>();
    const [credits, setCredits] = useState<Credits>();
    const [open, setOpen] = useState(false);

    const [waitingCardLoaded, setWaitingCardLoaded] = useState(false);

    useEffect(() => {
        const movieId = parseInt(id);
        async function getMovie() {
            setMovie(await getSingleMovie(movieId));
        }
        getMovie();
    }, [id]);

    useEffect(() => {
        async function getCredits() {
            setCredits(await afterCreditsCheck(movie!));
        }

        if (movie) {
            getCredits();
        }
    }, [open, movie]);

    useEffect(() => {
        if (credits) {
            setWaitingCardLoaded(true);
        } else {
            setWaitingCardLoaded(false);
        }
    }, [credits]);

    if (movie) {
        return (
            <div className={classes.pageContainer}>
                <main>
                    <div className={classes.aboutContainer}>
                        <div className={classes.aboutCard}>
                            <MovieCard movie={movie} />
                        </div>
                        <div className={classes.aboutDetails}>
                            <h1>{movie.title}</h1>
                            <h2>{movie.releaseDate.getFullYear()}</h2>
                            <p>{movie.overview}</p>
                        </div>
                    </div>
                    {waitingCardLoaded ? (
                        <Zoom in={waitingCardLoaded}>
                            <div className={classes.waitingContainer}>
                                <WaitingCard
                                    credits={credits!}
                                    movie={movie}
                                    open={open}
                                    setOpen={setOpen}
                                />
                            </div>
                        </Zoom>
                    ) : (
                        <div className={classes.waitingProgressContainer}>
                            <CircularProgress size={60} />
                        </div>
                    )}
                </main>
            </div>
        );
    } else {
        return (
            <div className={classes.progressPageContainer}>
                <CircularProgress />
            </div>
        );
    }
};
