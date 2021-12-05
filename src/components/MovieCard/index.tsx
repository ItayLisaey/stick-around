import { Grow } from '@mui/material';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { posterImageUrlHD } from '../../api/tmdb/images.api';
import { Movie } from '../../types/movies.interface';
import classes from './movie-card.module.scss';

export interface MovieCardProps {
    movie: Movie;
    dummy?: boolean;
}

export const MovieCard: React.VFC<MovieCardProps> = ({ movie, dummy }) => {
    const [loaded, setLoaded] = useState(true);
    const history = useHistory();

    function handleClick() {
        if (!dummy) {
            history.push(`/movies/${movie.id}`);
        }
    }

    return (
        <div className={classes.card} onClick={handleClick}>
            <Grow in={loaded}>
                <img
                    onClick={handleClick}
                    src={posterImageUrlHD(movie.posterPath)}
                    alt={`${movie.title} poster image`}
                />
            </Grow>
        </div>
    );
};
