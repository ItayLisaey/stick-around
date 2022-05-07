import { ServerResponse } from '../types/api.types';
import { Broadcast } from '../types/broadcast.interface';
import { ServiceInstance } from './utils/backend.service';

class BoardcastService {
    service_prefix = 'broadcasts';

    async latest(id: number) {
        try {
            const res = await (
                await ServiceInstance()
            ).get<
                ServerResponse<
                    { data: Broadcast } | { data: null; message: string }
                >
            >(this.service_prefix + '/' + id);
            if (res.data.data) {
                return res.data.data;
            }
            return undefined;
        } catch {
            throw new Error('Broadcast Unavailable');
        }
    }
}

export const broadcastsService = new BoardcastService();
