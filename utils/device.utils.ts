import * as SecureStore from 'expo-secure-store';
import { v4 as uuidv4 } from 'uuid';

export const getDeviceID = async () => {
  const savedID = await SecureStore.getItemAsync('secure_deviceid');
  if (savedID) {
    return savedID;
  }

  const newID = uuidv4();
  await SecureStore.setItemAsync('secure_deviceid', newID);
  return newID;
};
