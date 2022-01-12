import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { Broadcast as IBroadcast } from '../../types/broadcast.interface';
import { setLatestBroadcastID } from '../../utils/broadcast.utils';
import classes from './broadcast.module.scss';

export interface BroadcastProps {
    broadcast: IBroadcast;
    exit: () => void;
}

export const Broadcast: React.VFC<BroadcastProps> = ({ broadcast, exit }) => {
    useEffect(() => {
        setLatestBroadcastID(broadcast.bid);
    }, [broadcast.bid]);

    return <div className={classes.root}>
        <button onClick={exit}>
            <FontAwesomeIcon icon={faTimes} />
        </button>
        <h1>{broadcast.title}</h1>
        <p>{broadcast.description}</p>

    </div>;
};
