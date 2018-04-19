import { BACKEND_URL, API_TOKEN } from 'react-native-dotenv'

import { getSession } from '../security/session';
import extractDeviceSensitiveData from '../security/device';
import { handle } from '../utils/async';

const endpoint = BACKEND_URL;
const token = API_TOKEN;
const requestSecondsTimeOut = 15;

async function setRequestCapacity(headers, body) {
    const resultHeaders = {
        ...headers,
        'Content-Type': 'application/json',
        Accept: 'application/json'
    };

    let error, session, detailsInfo;

    [error, session = null] = await handle(getSession());

    [error, detailsInfo = {}] = await handle(extractDeviceSensitiveData());

    const resultBody = {
        ...body,
        token,
        detailsInfo
    };

    if (session) {
        resultBody.session = session;
    }

    return {
        body: resultBody,
        headers: resultHeaders
    };
}

function timeout(promise) {
    return new Promise((resolve, reject) => {
        const timeOutId = setTimeout(() => {
            const error = { errorMessage: 'Connection timeout', errorCode: 500 };
            reject(error);
        }, requestSecondsTimeOut * 1000);
        promise
            .then((data) => {
                clearTimeout(timeOutId);
                resolve(data);
            }).catch((err) => {
            console.log(err);
            clearTimeout(timeOutId);
            const error = { errorCode: 500, errorMessage: 'No connection with server' };
            reject(error);
        });
    });
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 299) {
        return;
    }

    const error = { errorMessage: response.statusText, errorCode: response.status };
    throw error;
}

function parseResponse({ errorCode, errorMessage, result, session_id: session } = {}) {
    if (errorCode !== 0) {
        const error = isNaN(parseInt(errorCode, 10))
            ? { errorCode: 500, errorMessage: 'Unknown error code' }
            : { errorCode, errorMessage };
        throw error;
    }

    return { result, session };
}

export default class ApiUtils {
    static async request(method, url, data, headers = {}) {
        let requestContent, error, response, responseJson;

        [error, requestContent] = await handle(setRequestCapacity(headers, data));

        console.log('_____________________ request content _________________________');
        console.log(requestContent);

        if (error) {
            throw error;
        }

        const { body, headers: requestHeaders } = requestContent;

        console.log('____________________ starting request ____________________');
        console.log(`endpoint: ${endpoint + url}`);
        console.log(`body: ${JSON.stringify(body)}`);
        console.log('__________________________________________________________');
        [error, response] = await handle(timeout(fetch(endpoint + url, {
            method,
            body: JSON.stringify(body),
            headers: requestHeaders
        })));

        if (error) {
            console.log(error);
            throw error;
        }

        console.log('_____________________ response _________________________');
        console.log(response);
        checkStatus(response);

        [error, responseJson] = await handle(response.json());

        if (error) {
            console.log(error);
            throw error;
        }

        console.log('_____________________ response json _________________________');
        console.log(responseJson);

        return parseResponse(responseJson);
    }

    static post = (...args) => ApiUtils.request('POST', ...args);

    constructor() {
        throw new Error('can not execute static class');
    }
}
