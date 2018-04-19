import {
    getCredentials,
    removeCredentials
} from '../../security/user';
import {handle} from '../../utils/async';
import { signOutAction } from '../actions/appState';
import {signInThunkCreator} from './signin';

export async function checkSessionThunk(dispatch) {
    console.log('___________________ gettingCredentials ___________________');
    const [error, credentials] = await handle(getCredentials());

    console.log(error);
    console.log(credentials);

    if (!error &&
        credentials &&
        credentials.login &&
        credentials.password) {
        const { login, password } = credentials;
        console.log('___________________ trying sign in ___________________');
        dispatch(signInThunkCreator(login, password));
    } else {
        console.log('___________________ sign out ___________________');
        dispatch(signOutAction);
    }
}

export async function signOutThunk(dispatch) {
    const [error] = await handle(removeCredentials());

    if (error) {
        throw error;
    }

    dispatch(signOutAction);

    return true;
}
