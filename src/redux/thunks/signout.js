import { signOutThunk } from './session';

export const signOutThunkCreator = (navigation) => async function (dispatch) {

    await dispatch(signOutThunk);

    navigation.navigate('Auth');
};
