import { createContext, useCallback, useEffect, useState } from 'react';
import { Device, DeviceId } from '@capacitor/device';

export interface DeviceContextProps {
    deviceID: DeviceId | undefined;
}

export const DeviceContext = createContext<DeviceContextProps>({
    deviceID: undefined,
});

export interface DeviceProviderProps {}

export const DeviceProvider: React.FC<DeviceProviderProps> = (props) => {
    const [deviceID, setDeviceID] = useState<DeviceId>();

    const getId = useCallback(async () => {
        const id = await Device.getId();
        setDeviceID(id);
    }, []);

    useEffect(() => {
        getId();
    }, [getId]);

    return (
        <DeviceContext.Provider
            value={{
                deviceID,
            }}
        >
            {props.children}
        </DeviceContext.Provider>
    );
};
