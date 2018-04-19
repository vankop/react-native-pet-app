import { Platform } from 'react-native';
import { version } from '../../package.json';

const objectId = 'fa9b397bc680d6a607679bb3d83a0bcd178ff52a96754428b97c2523cee9eb04';
const guid = 'ec8e0d95690aacd0c8f716d76741195b';

export default async function extractDeviceSensitiveData() {
    return {
        object_id: objectId,
        guid,
        app_version: version,
        user_agent: Platform.OS.toUpperCase()
    };
}
