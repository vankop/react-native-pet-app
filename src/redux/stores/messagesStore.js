import { concat } from 'lodash';
import {batchActions} from 'redux-batched-actions';

import {createRequestThunk} from '../thunks/createRequestThunk';
import {createDataStore} from './createDataStore';
import {messageCountReached} from './canFetchMore';

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
            const actions = [];

            if (offset === 0) {
                return successActionCreator(messages);
            }

            if (messages.length < LIMIT) {
                actions.push(messageCountReached.actionCreator(false));
            }

            const currentArray = messagesStore.selectors.data(getState()) || [];

            actions.push(successActionCreator(concat(
                currentArray,
                messages
            )));

            return batchActions(actions);
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
