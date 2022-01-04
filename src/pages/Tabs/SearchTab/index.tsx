import { faFilm, faInbox, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logEvent } from 'firebase/analytics';
import { useEffect, useState } from 'react';
import { getSearchResults } from '../../../api/tmdb/search.api';
import { analytics } from '../../../App';
import { MovieBar } from '../../../components/MovieBar';
import { Movie } from '../../../types/movies.interface';
import classes from './search-tab.module.scss';

export interface SearchTabProps {}

export const SearchTab: React.VFC<SearchTabProps> = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        async function getMovies() {
            setMovies(await getSearchResults(query));
        }
        if (query !== '') {
            getMovies();
        }
    }, [query]);

    useEffect(() => {
        logEvent(analytics, 'page_view', { page_title: 'search' });
    }, []);

    function noResults() {
        if (query === '') {
            return (
                <div className={classes.searchStartScreen}>
                    <FontAwesomeIcon icon={faFilm} />
                    <FontAwesomeIcon icon={faQuestion} />
                </div>
            );
        } else {
            return (
                <div className={classes.noResultsContainer}>
                    <FontAwesomeIcon icon={faInbox} />
                    <span>No results found</span>
                </div>
            );
        }
    }

    return (
        <div className={classes.searchContainer}>
            <div className={classes.searchField}>
                <input
                    type="text"
                    placeholder="Search..."
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.currentTarget.value)}
                />
            </div>
            {movies.length > 0 ? (
                <div className={classes.resultsContainer}>
                    {movies.map((movie, index) => (
                        <div className={classes.movieBarContainer} key={index}>
                            <MovieBar movie={movie} />
                        </div>
                    ))}
                </div>
            ) : (
                noResults()
            )}
        </div>
    );
};
