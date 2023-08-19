import { Device } from '@capacitor/device';
import axios from 'axios';

const baseURL = () => {
    const url = import.meta.env.VITE_BACKEND;
    if (!url) {
        throw new Error('backend location undetected');
    }
    return url as string;
};

const authKey = () => {
    const key = import.meta.env.VITE_SA_AUTH;
    if (!key) {
        throw new Error('backend location undetected');
    }
    return key as string;
};

export const backendAxiosInstance = axios.create({
    baseURL: baseURL(),
});

export const ServiceInstance = async () => {
    const id = await Device.getId();

    backendAxiosInstance.defaults.auth = {
        username: id.identifier,
        password: authKey(),
    };

    return backendAxiosInstance;
};
