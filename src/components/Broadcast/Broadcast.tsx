import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { broadcastsService } from '../../services/broadcasts.service';
import {
    getLatestBroadcastID,
    setLatestBroadcastID,
} from '../../utils/broadcast.utils';
import { Broadcast as IBroadcast } from '../../types/broadcast.interface';
import classes from './broadcast.module.scss';

export interface BroadcastProps {}

export const Broadcast: React.VFC<BroadcastProps> = () => {
    const [bid, setBid] = useState<number>();
    const [open, setOpen] = useState(true);

    useEffect(() => {
        const check = async () => {
            const id = await getLatestBroadcastID();
            setBid(id);
        };
        check();
    }, []);

    const { data, status } = useQuery<IBroadcast | undefined>(
        ['broadcasts', bid],
        () => broadcastsService.latest(bid ?? 0),
        {
            enabled: bid !== undefined,
        }
    );

    useEffect(() => {
        if (status === 'success' && data) {
            setLatestBroadcastID(data.bid);
        }
    }, [data, status]);

    const handleClose = () => setOpen(false);

    if (data && open) {
        return (
            <div className={classes.root}>
                <button onClick={handleClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <h1>{data.title}</h1>
                <p>{data.description}</p>
            </div>
        );
    }
    return <></>;
};
