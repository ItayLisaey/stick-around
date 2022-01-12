import { useHistory } from 'react-router';
import { posterImageUrlHD } from '../../api/tmdb/images.api';
import { Movie } from '../../types/movies.interface';
import classes from './movie-bar.module.scss';

export interface MovieBarProps {
    movie: Movie;
}

export const MovieBar: React.VFC<MovieBarProps> = ({ movie }) => {
    const history = useHistory();

    function handleClick() {
        history.push(`/movies/${movie.id}`);
    }

    return (
        <div
            className={classes.barContainer}
            style={{
                backgroundImage: `url(${posterImageUrlHD(movie.posterPath)})`,
            }}
            onClick={handleClick}
        >
            <span>{movie.title}</span>
            <span>{movie.releaseDate.getFullYear()}</span>
            <div className={classes.overlay}></div>
        </div>
    );
};
