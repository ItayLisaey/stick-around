import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import classes from './app-bar.module.scss';

export interface AppBarProps {
    title: string
    search?: boolean
    back?: boolean
}

export const AppBar: React.VFC<AppBarProps> = ({ title, search, back }) => {
    const history = useHistory();

    function handleSearch() {
        history.push('/search');
    }

    function handleBack() {
        history.push('/highlight');
    }

    return (
        <div className={classes.barContainer}>
            {!back ? (
                <span>{title}</span>
            ) : (
                <IconButton onClick={handleBack}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </IconButton>
            )}
            {search && (
                <IconButton onClick={handleSearch}>
                    <SearchIcon color="primary" />
                </IconButton>
            )}
        </div>
    );
};
