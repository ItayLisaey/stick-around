export const getBackendURL = () => {
    const url = import.meta.env.VITE_BACKEND;
    if (url) {
        return url.toString();
    } else {
        return null;
    }
};
