import { getBackendURL } from '../../utils/api.utils';

export async function authenticate(): Promise<boolean> {
    const response = await fetch(`${getBackendURL()}/authenticate`, {
        credentials: 'include',
        method: 'POST',
    }).then((res) => res.json());
    if (response.success) {
        return true;
    } else {
        return false;
    }
}
