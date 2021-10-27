import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { getNowPlaying } from '../../../api/nowPlaying';
import { AppBar } from '../../../components/AppBar';
import { MovieCard } from '../../../components/MovieCard';
import { Movie } from '../../../types/movies.interface';
import classes from './highlight-tab.module.scss';

export interface HighlightTabProps {}

export const HighlightTab: React.VFC<HighlightTabProps> = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        async function getMovies() {
            try {
                const movies = await getNowPlaying().catch((err) => {
                    throw Error('Error getting movies');
                });

                if (movies) {
                    setMovies(movies);
                } else {
                    throw Error('Movies undefined');
                }
            } catch (err) {
                console.error(err);
            }
        }
        getMovies();
    }, []);

    return (
        <div className={classes.nowPlayingContainer}>
            {movies.length > 0 ? (
                <div className={classes.highlightContainer}>
                    <AppBar title="In Theaters" search />
                    <div className={classes.cardsContainer}>
                        {movies.map((movie, index) => (
                                <MovieCard
                                    movie={movie}
                                    key={index}
                                ></MovieCard>
                            ))}
                    </div>
                </div>
            ) : (
                <div className={classes.progressContainer}>
                    <CircularProgress />
                </div>
            )}
        </div>
    );
};
