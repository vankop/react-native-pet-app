import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Touchable from 'react-native-platform-touchable';
import {Button, Text, View, AppState, Platform} from 'react-native';
import {appHeaderOptions, hitSlop} from '../../design/misc';
import {connect} from 'react-redux';
import {signOutThunk} from '../../redux/thunks/session';
import {signOutAppState} from '../../security/appState';
import styles from '../../design/styles';

class HomeScreen extends Component {
    static propTypes = {
        signOut: PropTypes.func.isRequired,
        signingOut: PropTypes.bool.isRequired
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
        const { navigation, signOut, signingOut } = this.props;

        return [
            <Button
                key={0}
                onPress={signOut}
                style={styles.signOutButton}
                title={signingOut ? 'Signing out...' : 'Sign out'}
            />,
            <View key={1} style={{
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Text>THIS IS LANDING!!!!</Text>
            </View>
        ];
    }
}

export default connect(state => ({
    signingOut: state.appState === signOutAppState
}), dispatch => ({
  signOut: () => dispatch(signOutThunk)
}))(HomeScreen);
