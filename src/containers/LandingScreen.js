import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Touchable from 'react-native-platform-touchable';
import {Button, Text, View, AppState, Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';

import { mainColor, touchColor } from '../design/colors';
import {appHeaderOptions, hitSlop} from '../design/misc';

export default class LandingScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: (
                <Button
                    onPress={() => navigation.navigate('DrawerToggle')}
                    title="Info"
                />
            ),
            title: 'My Cool App',
            ...appHeaderOptions
        };
    };

    static propTypes = {
        getProfile: PropTypes.any
    };

    constructor({ session }) {
        super();

        this.handleAppStateChange = this.handleAppStateChange.bind(this);
    }

    handleAppStateChange(appState) {
        if (appState === 'background') {
            let date = new Date(Date.now() + (10 * 1000));

            if (Platform.OS === 'ios') {
                date = date.toISOString();
            }

            PushNotification.localNotificationSchedule({
                message: "My Notification Message",
                date,
            });
        }
    }

    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    render() {
        const { navigation } = this.props;

        return (
            <View style={{
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Text>THIS IS LANDING</Text>
                <Touchable
                    onPress={() => navigation.navigate('Second')}
                    hitSlop={hitSlop}
                    style={{
                        backgroundColor: '#eee',
                        paddingVertical: 30,
                        flex: 1,
                        alignItems: 'center'
                    }}
                    underlayColor={touchColor}
                >
                    <Text>Go to 2nd screen</Text>
                </Touchable>
                <Touchable
                    onPress={() => navigation.navigate('First')}
                    hitSlop={hitSlop}
                    background={touchColor}
                >
                    <Text>Go to 1st screen</Text>
                </Touchable>
            </View>
        );
    }
}
