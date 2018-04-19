import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage, Text, View } from 'react-native';
import { times } from 'lodash';
import {connect} from 'react-redux';

import styles from '../design/styles';
import {checkSessionThunk} from '../redux/thunks/session';
import {navigationPropType} from '../types/navigation';
import {authorizedAppState, unauthorizedAppState} from '../security/appState';
import Logger from '../utils/logger';


const maxTicks = 5;
const period = 500;

function getText(second) {
    return `Loading.${times(second, () => '.').join('')}`;
}

export class LoadingScreen extends Component {
    static propTypes = {
        checkAppState: PropTypes.func.isRequired,
        appState: PropTypes.string.isRequired,
        navigation: PropTypes.shape(navigationPropType).isRequired
    };

    static getDerivedStateFromProps({ navigation, appState }) {
        if (appState === authorizedAppState) {
            navigation.navigate('App');
        } else if (appState === unauthorizedAppState) {
            navigation.navigate('Auth');
        }

        return null;
    }

    constructor({ checkAppState }) {
        super();
        Logger.info('checking session');
        checkAppState();

        this.state = {
            tick: 0
        };
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState(({ tick }) => {
                return {
                    tick: tick === maxTicks ? 0 : (tick + 1)
                };
            });
        }, period);
    }

    shouldComponentUpdate(props, { tick }) {
        return tick !== this.state.tick;
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{getText(this.state.tick)}</Text>
            </View>
        );
    }
}

export default connect(
    state => ({
        appState: state.appState
    }),
    dispatch => ({
        checkAppState: () => dispatch(checkSessionThunk)
    })
)(LoadingScreen);
