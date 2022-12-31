import * as SecureStore from 'expo-secure-store';
import uuid from 'react-native-uuid';

export const getDeviceID = async () => {
  const savedID = await SecureStore.getItemAsync('secure_deviceid');
  if (savedID) {
    return savedID.toString();
  }

  const newID = uuid.v4();
  await SecureStore.setItemAsync('secure_deviceid', newID.toString());
  return newID.toString();
};
