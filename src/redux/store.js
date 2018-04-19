import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import { reducer } from 'redux-form';
import thunk from 'redux-thunk';

import appState from './reducers/appState';
import session from './reducers/session';

export default createStore(combineReducers({
    form: reducer,
    appState,
    session
}), applyMiddleware(thunk));
