import axios from 'axios';
import { getBackendURL } from '../../utils/api.utils';
import { getDeviceID } from '../../utils/device.utils';

const baseURL = () => {
  const url = process.env.SERVER_LOCATION;
  if (!url) {
    throw new Error('backend location undetected');
  }
  return url as string;
};

const authKey = () => {
  const key = process.env.SA_AUTH;
  if (!key) {
    throw new Error('backend location undetected');
  }
  return key as string;
};

export const backendAxiosInstance = axios.create({
  baseURL: getBackendURL() ?? 'http://localhost:3000',
});

export const ServiceInstance = async () => {
  const id = await getDeviceID();

  backendAxiosInstance.defaults.auth = {
    username: id,
    password: authKey(),
  };

  return backendAxiosInstance;
};
