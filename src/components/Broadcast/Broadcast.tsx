import { Broadcast as IBroadcast } from '../../types/broadcast.interface';
import classes from './broadcast.module.scss';

export interface BroadcastProps {
    broadcast: IBroadcast;
}

export const Broadcast: React.VFC<BroadcastProps> = ({ broadcast }) => {
    return <div className={classes.root}>{broadcast.title}</div>;
};
