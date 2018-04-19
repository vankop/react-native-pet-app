import { clone } from 'lodash';

import ApiUtils from '../../network/ApiUtils';
import {
    signInActionCreator,
    signOutAction
} from '../actions/appState';
import Logger from '../../utils/logger';

export const createRequestThunk = ({
   actionCreators: [startActionCreator, failureActionCreator, successActionCreator] = []
}, apiUri) =>
    function requestThunk(requestPayload) {
        return function request(dispatch, getState) {
            const extraActionCreatorParameter = clone(requestPayload);
            const session = getState().session;
            if (startActionCreator) {
                dispatch(startActionCreator(extraActionCreatorParameter, getState));
            }

            const errorHandler = (error) => {
                // if (failureActionCreator) {
                //     dispatch(failureActionCreator(
                //         { errorMessage, errorCode },
                //         extraActionCreatorParameter,
                //         getState
                //     ));
                // }

                // if (errorCode === 401) {
                //     history.push('/login');
                // }

                Logger.error('request error\n', error);

                const { errorCode, errorMessage } = error;

                return Promise.reject(errorMessage);
            };

            ApiUtils.session = session;

            return ApiUtils
                .post(apiUri, requestPayload)
                .then(({ result, session }) => {
                    if (session) {
                        Logger.info('sign in by session', session);
                        dispatch(signInActionCreator(session))
                    } else {
                        Logger.info('sign out by server', session);
                        dispatch(signOutAction)
                    }

                    return result;
                })
                .then((result = []) => {
                    if (successActionCreator) {
                        dispatch(successActionCreator(
                            result,
                            extraActionCreatorParameter,
                            getState
                        ));
                    }

                    return result;
                }).catch(errorHandler);
        };
    };
