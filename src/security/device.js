import { Platform } from 'react-native';
import { version } from '../../package.json';

const objectId = 'fa9b397bc680d6a607679bb3d83a0bcd178ff52a96754428b97c2523cee9eb04';
const guid = '5934e278e66a4c4a6865f7bc7622cdc2';

export default async function extractDeviceSensitiveData() {
    return Promise.resolve(() => ({
        object_id: objectId,
        guid,
        app_version: version,
        user_agent: Platform.OS.toUpperCase()
    }));
}
