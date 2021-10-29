import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CircularProgress, Fade } from '@mui/material';
import { useCallback, useRef, useState } from 'react';
import { AppBar } from '../../../components/AppBar';
import { MovieCard } from '../../../components/MovieCard';
import useNowPlaying from '../../../hooks/UseNowPlaying';
import classes from './highlight-tab.module.scss';

export interface HighlightTabProps {}

export const HighlightTab: React.VFC<HighlightTabProps> = () => {
    const [page, setPage] = useState<number>(1);

    const { movies, hasMore, loading, error } = useNowPlaying(page);

    const observer = useRef<IntersectionObserver | null>(null);

    const lastCardRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((p) => p + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    return (
        <div className={classes.nowPlayingContainer}>
            {movies.length > 0 ? (
                <div className={classes.highlightContainer}>
                    <AppBar title="In Theaters" search />
                    <div className={classes.cardsContainer}>
                        {movies.map((movie, index) => {
                            if (movies.length === index + 1) {
                                return (
                                    <div ref={lastCardRef} key={index}>
                                        <MovieCard movie={movie}></MovieCard>
                                    </div>
                                );
                            } else {
                                return (
                                    <MovieCard
                                        movie={movie}
                                        key={index}
                                    ></MovieCard>
                                );
                            }
                        })}
                        {!error && (
                            <Fade in={loading}>
                                <div className={classes.loadingCard}>
                                    <CircularProgress />
                                </div>
                            </Fade>
                        )}

                        <Fade in={error}>
                            <div className={classes.errorCard}>
                                <FontAwesomeIcon icon={faExclamationTriangle} />
                            </div>
                        </Fade>
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
