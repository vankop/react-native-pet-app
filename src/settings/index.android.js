import AppSettings from 'react-native-android-native-app-settings';
import { DeviceEventEmitter } from 'react-native';
import {handle} from '../utils/async';
import Logger from '../utils/logger';

async function getSettings() {
    const [error, values] = await handle(Promise.all([
        AppSettings.getString('sender_id'),
        AppSettings.getString('backend_url'),
        AppSettings.getString('service_token')
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

const backEndEndpointSubscribes = [];

export function subscribeEndPoint(callback) {
    backEndEndpointSubscribes.push(callback);
}

function listener({ key }) {
    Logger.debug('LISTENER', `key changed: ${key}`);
    if (key === 'backend_url') {
        AppSettings
            .getString('backend_url')
            .then(url => backEndEndpointSubscribes.forEach(callback => callback(url)));
    }
}

export function listenSettings() {
    AppSettings.listenChanges();
    DeviceEventEmitter.addListener('preferencesChanged', listener);
}

export function unlistenSettings() {
    AppSettings.unlistenChanges();
    DeviceEventEmitter.removeListener('preferencesChanged', listener);
}
