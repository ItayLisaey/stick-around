import { Zoom } from '@mui/material';
import { MovieCard } from '../../components/MovieCard';
import { StatusIndicator } from '../../components/StatusIndicator';
import { WaitingCard } from '../../components/WaitingCard';
import classes from './movie-page.module.scss';
import { useMoviePage } from './useMoviePage';

export interface MoviePageProps {
    id: string;
}

export const MoviePage: React.VFC<MoviePageProps> = ({ id }) => {
    const { data, status } = useMoviePage(id);

    return (
        <StatusIndicator loading={status.loading} error={status.error}>
            {data.movie && (
                <div className={classes.pageContainer}>
                    <main>
                        <div className={classes.aboutContainer}>
                            <div className={classes.aboutCard}>
                                <MovieCard movie={data.movie} />
                            </div>
                            <div className={classes.aboutDetails}>
                                <h1>{data.movie.title}</h1>
                                <h2>{data.movie.releaseDate.getFullYear()}</h2>
                                <p>{data.movie.overview}</p>
                            </div>
                        </div>
                        <Zoom in={!status.loading}>
                            <div className={classes.waitingContainer}>
                                <WaitingCard movie={data.movie} />
                            </div>
                        </Zoom>
                    </main>
                </div>
            )}
        </StatusIndicator>
    );
};
