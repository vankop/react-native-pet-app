import { SENDER_ID, API_TOKEN, BACKEND_URL } from 'react-native-dotenv';
import {handle} from '../utils/async';
import Logger from '../utils/logger';

async function getSettings() {
    const [error, values] = await handle(new Promise(resolve => setTimeout(resolve, 1000)));
        //TODO extract shared references
        // SharedPreferences.getItems(['sender_id', 'backend_url', 'service_token'], values => resolve(values))));

    if (error) {
        Logger.error(error);
        throw error;
    }

    // const [gsmSenderId, backendEndpoint, empToken] = values;

    return {
        gsmSenderId: SENDER_ID,
        backendEndpoint: BACKEND_URL,
        empToken: API_TOKEN
    };
}

export default getSettings();
