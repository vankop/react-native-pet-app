import { concat } from 'lodash';

import {createRequestThunk} from '../thunks/createRequestThunk';
import {createDataStore} from './createDataStore';

export const messagesStore = createDataStore('messages');

const LIMIT = 20;

const [
    loadingActionCreator,
    errorActionCreator,
    successActionCreator
] = messagesStore.actionCreators;

const requestMessages = createRequestThunk({
    actionCreators: [
        loadingActionCreator,
        errorActionCreator,
        (messages = [], { data: { offset } }, getState) => {
            if (offset === 0) {
                return successActionCreator(messages);
            }

            const currentArray = messagesStore.selectors.data(getState()) || [];

            return successActionCreator(concat(
                currentArray,
                messages
            ));
        }
    ]
} , '/');

export function fetchMessagesThunk(dispatch, getState) {
    const messages = messagesStore.selector.data(getState()) || [];

    return dispatch(requestMessages({
        data: {
            offset: messages.length,
            limit: LIMIT
        },
        empAction: 'UNC_LIST'
    }));
}
