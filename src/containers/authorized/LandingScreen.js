import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Touchable from 'react-native-platform-touchable';
import {Button, Text, View, AppState, Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';

import { mainColor, touchColor } from '../../design/colors';
import {appHeaderOptions, hitSlop} from '../../design/misc';
import {connect} from 'react-redux';
import {signOutThunkCreator} from '../../redux/thunks/signout';

export default class LandingScreen extends Component {
    static navigationOptions = ({ navigation, screenProps: signOut }) => {
        console.log('_________ nav props ___________________');
        console.log(signOut);
        console.log(JSON.stringify(navigation));

        return {
            headerLeft: (
                <Button
                    onPress={() => navigation.navigate('DrawerToggle')}
                    title="Info"
                />
            ),
            headerRight: (
                <Button
                    onPress={signOut}
                    title="Sign out"
                />
            ),
            title: 'My Cool App',
            ...appHeaderOptions
        };
    };

    static propTypes = {
        signOut: PropTypes.func.isRequired
    };

    constructor({ session }) {
        super();

        this.handleAppStateChange = this.handleAppStateChange.bind(this);
    }

    handleAppStateChange(appState) {
        if (appState === 'background') {
            // let date = new Date(Date.now() + (10 * 1000));
            //
            // if (Platform.OS === 'ios') {
            //     date = date.toISOString();
            // }
            //
            // PushNotification.localNotificationSchedule({
            //     message: "My Notification Message",
            //     date,
            // });
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
                <Text>THIS IS LANDING!!!!</Text>
            </View>
        );
    }
}
