import * as ethers from 'ethers';
export type Device = {
    deviceId: string
    deviceInfo: string
}

export const getDevice = (): Device => {
    const ua = global.navigator.userAgent;
    const id = ethers.utils.id(ua).slice(0, 10);
    return {
        deviceId: id,
        deviceInfo: ua,
    }
}