import {
    authorizedAppState,
    unauthorizedAppState
} from '../../security/appState';

export const appStateActionType = 'APP_STATE';

export const signOutAction = {
    type: appStateActionType,
    payload: authorizedAppState
};

export const signInAction = {
    type: appStateActionType,
    payload: unauthorizedAppState
};
