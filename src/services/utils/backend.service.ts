import axios from 'axios';
import { Device } from '@capacitor/device';

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
        username: id.uuid,
        password: authKey(),
    };

    return backendAxiosInstance;
};
