import { Storage } from '@capacitor/storage';

export async function getLatestBroadcastID(): Promise<number> {
    const { value } = await Storage.get({ key: 'broadcast' });
    if (!value) {
        return 0;
    } else {
        return Number.parseInt(value);
    }
}

export async function setLatestBroadcastID(id: number | undefined) {
    if (id) {
        await Storage.set({
            key: 'broadcast',
            value: id.toString(),
        });
    }
}
