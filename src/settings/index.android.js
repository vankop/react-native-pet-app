import RNAndroidNativeSettings from 'react-native-android-native-app-settings';
import {handle} from '../utils/async';
import Logger from '../utils/logger';

async function getSettings() {
    const [error, values] = await handle(Promise.all([
        RNAndroidNativeSettings.getString('sender_id'),
        RNAndroidNativeSettings.getString('backend_url'),
        RNAndroidNativeSettings.getString('service_token')
    ]));

    if (error) {
        Logger.error(error);
        throw error;
    }

    const [
        gsmSenderId,
        backendEndpoint,
        empToken
    ] = values;

    Logger.debug('SENDER_ID', gsmSenderId);
    Logger.debug('BACKEND_URL', backendEndpoint);
    Logger.debug('SERVICE_TOKEN', empToken);

    return {
        gsmSenderId,
        backendEndpoint,
        empToken
    };
}

export default getSettings();
