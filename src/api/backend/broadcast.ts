import { Broadcast } from '../../types/broadcast.interface';
import {
    getLatestBroadcastID,
    setLatestBroadcastID,
} from '../../utils/broadcast.utils';
import { backend_url } from './movies';

export async function getLatestBroadcast(): Promise<Broadcast | null> {
    const latestId = await getLatestBroadcastID();
    const response = await fetch(`${backend_url}/broadcast/${latestId}`);
    if (response.status === 204) {
        return null;
    } else if (response.ok) {
        const res = await response.json();
        const data = res.data as Broadcast;
        setLatestBroadcastID(data.id);
        return data;
    } else {
        return null;
    }
}
