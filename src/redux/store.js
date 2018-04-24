import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import { enableBatching } from 'redux-batched-actions';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';

import { reducer as filterReducer } from './stores/filtersStore';
import appState from './reducers/appState';
import session from './reducers/session';
import profileStore from './stores/profileStore';

export default createStore(enableBatching(combineReducers({
    form: formReducer,
    appState,
    session,
    profile: profileStore.reducer,
    filters: filterReducer
})), applyMiddleware(thunk));
