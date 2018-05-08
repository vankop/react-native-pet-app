import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {View, Dimensions, StyleSheet, Text} from 'react-native';
import { map, find } from 'lodash';
import {connect} from 'react-redux';

import mapDataStore, { requestData } from '../../redux/stores/mapDataStore';
import Logger from '../../utils/logger';
import Device from '../../security/device';
import icons from '../../design/icons';
import {mainColor} from '../../design/colors';
import MarkerInfo from './MarkerInfo';
import styles from '../../design/styles';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

let markerIcon;

Icon.getImageSource('place', icons.size.medium, mainColor).then(source => markerIcon = source);

const initialRegion = {
    latitude: 55.7494733,
    longitude: 37.3523255,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
};

class MapScreen extends Component {
    static propTypes = {
        data: PropTypes.array,
        loading: PropTypes.bool.isRequired,
        requestData: PropTypes.func.isRequired
    };

    constructor({ requestData }) {
        super();

        requestData();

        this.state = {
            selected: null
        };

        this.setMapRef = this.setMapRef.bind(this);
        this.handleMarkerPress = this.handleMarkerPress.bind(this);
        this.handleMoveToMarker = this.handleMoveToMarker.bind(this);
        this.handleMarkerInfoClose = this.handleMarkerInfoClose.bind(this);
    }

    componentDidMount() {
        Device
            .requestLocationPermissions()
            .then((granted) => {
                if (granted) {
                    Logger.debug('ACCESS TO USER POSITION GRANTED');
                    navigator.geolocation.getCurrentPosition(({
                        coords
                    }) => {
                        Logger.debug('COORDS', coords);
                        if (this.map) {
                            // Sometimes doesn't work just on did mount hook
                            requestAnimationFrame(() => this.map.animateToCoordinate(coords, 500));
                        }
                    }, Logger.error, { timeout: 5000 });
                }
            })
    }

    setMapRef(instance) {
        this.map = instance;
    }

    handleMarkerPress(event) {
        Logger.debug('MARKER PRESED');
        const { id: selectedId, coordinate } = event.nativeEvent;
        const selected = find(this.props.data, ({
            GLOBALID: id
        }) => id === selectedId);

        if (selected) {
            Logger.debug('SELECTED SETTED');

            this.setState({
                selected
            });

            if (this.map) {
                this.map.animateToCoordinate(coordinate, 500);
            }
        }
    }

    handleMarkerInfoClose() {
        this.setState({ selected: null });
    }

    handleMoveToMarker() {
        if (this.map) {
            this.map.animateToCoordinate(this.state.selected.location, 500);
        }
    }

    render() {
        const {
            data
        } = this.props;

        const {
            location,
            selected
        } = this.state;

        return (
            <View style={styles.map}>
                <MapView
                    ref={this.setMapRef}
                    showsUserLocation
                    initialRegion={initialRegion}
                    followsUserLocation
                    moveOnMarkerPress={false}
                    style={StyleSheet.absoluteFillObject}
                >
                    {map(data, ({
                        GLOBALID: id,
                        NAME: title,
                        location,
                        SPEC: description
                    }) => (
                        <Marker
                            key={id}
                            stopPropagation
                            identifier={id}
                            image={markerIcon}
                            title={title}
                            description={description}
                            coordinate={location}
                            onPress={this.handleMarkerPress}
                        />
                    ))}
                </MapView>
                {
                    selected
                    ? (
                      <MarkerInfo
                          description={selected.NAME}
                          title={selected.SPEC}
                          location={selected.location}
                          onMove={this.handleMoveToMarker}
                          onClose={this.handleMarkerInfoClose}
                      />
                    ) : null
                }
            </View>
        );
    }
}

export default connect(state => ({
    data: mapDataStore.selectors.data(state),
    loading: mapDataStore.selectors.loading(state)
}), dispatch => ({
    requestData: () => dispatch(requestData())
}))(MapScreen);
