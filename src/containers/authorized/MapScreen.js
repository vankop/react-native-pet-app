import React, { Component } from 'react';
import MapView from 'react-native-maps';
import {Text, View, Dimensions, StyleSheet} from 'react-native';
import styles from '../../design/styles';
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class MapScreen extends Component {
    render() {
        return (
            <View style={{
                ...StyleSheet.absoluteFillObject,
                justifyContent: 'flex-end',
                alignItems: 'center'
            }}>
                <MapView
                    initialRegion={{
                        latitude: LATITUDE,
                        longitude: LONGITUDE,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                    style={StyleSheet.absoluteFillObject}
                />
            </View>
        );
    }
}
