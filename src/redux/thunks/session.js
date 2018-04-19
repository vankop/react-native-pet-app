import {getSession, setSession} from '../../security/session';
import {handle} from '../../utils/async';
import {signInAction, signOutAction} from '../actions/appState';

export async function checkSessionThunk(dispatch) {
    let [error, session] = await handle(getSession());

    if (!error && session) {
        console.log('___________________ sign in ___________________');
        dispatch(signInAction);
    } else {
        console.log('___________________ sign out ___________________');
        dispatch(signOutAction);
    }

    return session;
}

export function setSessionThunkCreator(session) {
    return async function setSessionThunk(dispatch) {
        console.log(`setting session to : ${session}`);

        const [error] = await handle(setSession(session || ''));

        if (error) {
            throw error;
        }

        console.log('___________________ sign in ___________________');
        dispatch(signInAction);

        return true;
    }
}
