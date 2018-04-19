import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import { reducer } from 'redux-form';
import thunk from 'redux-thunk';

import appState from './reducers/appState';
import session from './reducers/session';
import profileStore from './stores/profileStore';

export default createStore(combineReducers({
    form: reducer,
    appState,
    session,
    profile: profileStore.reducer
}), applyMiddleware(thunk));
