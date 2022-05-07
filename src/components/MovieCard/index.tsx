import { Grow } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { posterImageUrlHD } from '../../api/tmdb/images.api';
import { Movie } from '../../types/movies.interface';
import classes from './movie-card.module.scss';

export interface MovieCardProps {
    movie: Movie;
    dummy?: boolean;
}

export const MovieCard: React.VFC<MovieCardProps> = ({ movie }) => {
    const [loaded, setLoaded] = useState(false);
    const [imagePath, setImagePath] = useState(
        '/images/MoviePosterPlaceholder.png'
    );

    useEffect(() => {
        const fetchImage = async () => {
            const res = await fetch(posterImageUrlHD(movie.posterPath));
            if (res.ok) {
                setImagePath(res.url);
                setLoaded(true);
            }
        };
        fetchImage();
    }, [movie.posterPath]);

    return (
        <Link className={classes.card} to={`/movies/${movie.id}`}>
            <Grow in={loaded}>
                {loaded ? (
                    <img
                        loading="lazy"
                        src={imagePath}
                        alt={`${movie.title} poster image`}
                    />
                ) : (
                    <img
                        loading="lazy"
                        src={'/images/MoviePosterPlaceholder.png'}
                        alt={`${movie.title} poster image`}
                    />
                )}
            </Grow>
        </Link>
    );
};
