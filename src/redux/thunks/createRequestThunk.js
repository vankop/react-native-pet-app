import { clone } from 'lodash';

import ApiUtils from '../../network/ApiUtils';
import {setSession} from '../../security/session';
import {signOutAction} from '../actions/appState';
import {setSessionThunkCreator} from './session';

function signOutThunk(dispatch) {
    setSession(null);

    dispatch(signOutAction);
}

export const createRequestThunk = ({
   actionCreators: [startActionCreator, failureActionCreator, successActionCreator] = []
}, apiUri) =>
    function requestThunk(requestPayload) {
        return function request(dispatch, getState) {
            const extraActionCreatorParameter = clone(requestPayload);
            if (startActionCreator) {
                dispatch(startActionCreator(extraActionCreatorParameter, getState));
            }

            const errorHandler = ({ errorCode, errorMessage }) => {
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

                console.log('______________________ request error ______________________');
                console.log(`msg: ${errorMessage}`);
                console.log(`code: ${errorCode}`);
                return Promise.reject(errorMessage);
            };

            return ApiUtils
                .post(apiUri, requestPayload)
                .then(({ result = [], session }) => {
                    if (successActionCreator) {
                        dispatch(successActionCreator(
                            result,
                            extraActionCreatorParameter,
                            getState
                        ));
                    }

                    if (session) {
                        dispatch(setSessionThunkCreator(session));
                    }


                    return result;
                }).catch(errorHandler);
        };
    };
