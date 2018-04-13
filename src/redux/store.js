import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer } from 'redux-form';
import thunk from 'redux-thunk';

export default createStore(combineReducers({
    form: reducer
}), applyMiddleware(thunk));
