import { Button } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faHeart, faSearch } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import classes from './bottom-nav.module.scss';

export interface BottomNavProps {}

export const BottomNav: React.VFC<BottomNavProps> = () => {
    const history = useHistory();

    const linksLocations = {
        theaters: '/highlight',
        search: '/search',
        donate: '/donate',
    };

    function handleClick(location: string) {
        history.push(location);
    }

    return (
        <div className={classes.box}>
            <Button
                className={classNames(classes.navBtn, {
                    [classes.selected]:
                        history.location.pathname === linksLocations.theaters,
                })}
                onClick={(e) => handleClick(linksLocations.theaters)}
            >
                <div>
                    <FontAwesomeIcon icon={faFilm} />
                    <span>In Theaters</span>
                </div>
            </Button>
            <Button
                className={classNames(classes.navBtn, {
                    [classes.selected]:
                        history.location.pathname === linksLocations.search,
                })}
                onClick={(e) => handleClick(linksLocations.search)}
            >
                <div>
                    <FontAwesomeIcon icon={faSearch} />
                    <span>Search</span>
                </div>
            </Button>
            <Button
                className={classNames(classes.navBtn, {
                    [classes.selected]:
                        history.location.pathname === linksLocations.donate,
                })}
                onClick={(e) => handleClick(linksLocations.donate)}
            >
                <div>
                    <FontAwesomeIcon icon={faHeart} />
                    <span>Answers</span>
                </div>
            </Button>
        </div>
    );
};
