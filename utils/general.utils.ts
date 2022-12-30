export function getCookie(cname: string) {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

export function checkCookie(cname: string): boolean {
    const cookie = getCookie(cname);
    if (cookie === '') {
        return false;
    } else {
        return true;
    }
}
