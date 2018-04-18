import { getSession } from '../security/session';
import extractDeviceSensitiveData from '../security/device';
import { handle } from '../utils/async';

const endpoint = process.env.BACKEND_URL;
const token = process.env.API_TOKEN;
const requestSecondsTimeOut = 15;

async function setRequestCapacity(headers, body) {
    const resultHeaders = {
        ...headers,
        'Content-Type': 'application/json'
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
            const error = { errorMessage: 'Превышено время ожидания ответа сервера', errorCode: 500 };
            reject(error);
        }, requestSecondsTimeOut * 1000);
        promise
            .then((data) => {
                clearTimeout(timeOutId);
                resolve(data);
            }).catch(() => {
            clearTimeout(timeOutId);
            const error = { errorCode: 500, errorMessage: 'Отсутствует соединение с сервером' };
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

function parseResponse({ errorCode, errorMessage, result } = {}) {
    if (errorCode !== 0) {
        const error = isNaN(parseInt(errorCode, 10))
            ? { errorCode: 500, errorMessage: 'Некорректный формат ответа сервера' }
            : { errorCode, errorMessage };
        throw error;
    }

    return result;
}

export default class ApiUtils {
    static async request(method, url, data, headers = {}) {
        let requestContent, error, response;

        [error, requestContent] = await handle(setRequestCapacity(headers, data));

        if (error) {
            throw error;
        }

        const { body, headers: requestHeaders } = requestContent;

        [error, response] = await timeout(fetch(endpoint + url, {
            method,
            body,
            headers: requestHeaders
        }));

        if (error) {
            throw error;
        }

        checkStatus(response);

        return parseResponse(response);
    }

    static post = (...args) => ApiUtils.request('POST', ...args);

    constructor() {
        throw new Error('can not execute static class');
    }
}