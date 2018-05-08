import { map, filter } from 'lodash';
import { compose } from 'redux';

import {createRequestThunk} from '../thunks/createRequestThunk';
import {createDataStore} from './createDataStore';

const mapDataStore = createDataStore('mapData');

const [
    loadingActionCreator,
    errorActionCreator,
    successActionCreator
] = mapDataStore.actionCreators;

export default mapDataStore;

const dataMapper = (data) => map(data, ({ X, Y, ...rest }) => ({
    location: {
        latitude: parseFloat(Y),
        longitude: parseFloat(X)
    },
    ...rest
}));

const dataFilter = (data) => filter(data, ({ GLOBALID }) => GLOBALID);

const request = createRequestThunk({
    actionCreators: [
        loadingActionCreator,
        errorActionCreator,
        compose(
            successActionCreator,
            dataMapper,
            dataFilter
        )
    ]
}, '/json/v1.0/opendata/info/getData');

export const requestData = () => request({
    Id: 619,
    limit: 100,
    offset: 0
});
