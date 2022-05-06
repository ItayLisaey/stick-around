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

const axiosInstance = axios.create({
    baseURL: baseURL(),
});

export const ServiceInstance = async () => {
    const id = await Device.getId();

    axiosInstance.defaults.auth = {
        username: id.uuid,
        password: authKey(),
    };

    return axiosInstance;
};
