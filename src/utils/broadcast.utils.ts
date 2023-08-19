import { Preferences } from '@capacitor/preferences';

export async function getLatestBroadcastID(): Promise<number> {
    const { value } = await Preferences.get({ key: 'broadcast' });
    if (!value) {
        return 0;
    } else {
        return Number.parseInt(value);
    }
}

export async function setLatestBroadcastID(id: number | undefined) {
    if (id) {
        await Preferences.set({
            key: 'broadcast',
            value: id.toString(),
        });
    }
}
