import { Broadcast } from '../../types/broadcast.interface';
import { getBackendURL } from '../../utils/api.utils';
import {
    getLatestBroadcastID,
    setLatestBroadcastID,
} from '../../utils/broadcast.utils';

export async function getLatestBroadcast(): Promise<Broadcast | null> {
    const latestId = await getLatestBroadcastID();
    const response = await fetch(`${getBackendURL()}/broadcast/${latestId}`);
    if (response.status === 404) {
        return null;
    } else if (response.ok) {
        const res = await response.json();
        const data = res.data as Broadcast;
        setLatestBroadcastID(data.bid);
        return data;
    } else {
        return null;
    }
}
