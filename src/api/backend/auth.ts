import { backend_url } from './movies';

export async function authenticate(): Promise<boolean> {
    const response = await fetch(`${backend_url}/authenticate`, {
        credentials: 'include',
        method: 'POST',
    }).then((res) => res.json());
    if (response.success) {
        return true;
    } else {
        return false;
    }
}
