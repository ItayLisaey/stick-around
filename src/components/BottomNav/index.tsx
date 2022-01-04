import { Button } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFilm,
    faHeart,
    faSearch,
    IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classes from './bottom-nav.module.scss';

interface TabProps {
    title: string;
    location: string;
    icon: IconDefinition;
}

const tabs: Record<string, TabProps> = {
    theaters: {
        title: 'In Theaters',
        location: '/highlight',
        icon: faFilm,
    },
    search: {
        title: 'Search',
        location: '/search',
        icon: faSearch,
    },
    donate: {
        title: 'Support',
        location: '/donate',
        icon: faHeart,
    },
};

export interface BottomNavProps {}

export const BottomNav: React.VFC<BottomNavProps> = () => {
    const [selected, setSelected] = useState<string>();
    const history = useHistory();

    function handleClick(location: string) {
        setSelected(location);
        history.push(location);
    }

    useEffect(() => {
        setSelected(history.location.pathname);
    }, [history.location.pathname]);

    return (
        <div className={classes.box}>
            {Object.values(tabs).map((tab, key) => (
                <Button
                    key={key}
                    className={classNames(classes.navBtn, {
                        [classes.selected]: selected === tab.location,
                    })}
                    onClick={(e) => handleClick(tab.location)}
                >
                    <div>
                        <FontAwesomeIcon icon={tab.icon} />
                        <span>{tab.title}</span>
                    </div>
                </Button>
            ))}
        </div>
    );
};
