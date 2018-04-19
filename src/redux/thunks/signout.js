import {setSessionThunkCreator} from './session';

export const signOutThunkCreator = (navigation) => async function signOutThunk(dispatch) {
    console.log('___________________ sign out ____________________');

    await dispatch(setSessionThunkCreator(null));

    navigation.navigate('Auth');
};
