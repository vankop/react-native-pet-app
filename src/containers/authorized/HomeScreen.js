import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Text, View } from 'react-native';

import {connect} from 'react-redux';
import {signOutThunk} from '../../redux/thunks/session';
import {signOutAppState} from '../../security/appState';
import styles from '../../design/styles';
import {requestProfile} from '../../redux/stores/profileStore';

class HomeScreen extends Component {
    static propTypes = {
        signOut: PropTypes.func.isRequired,
        getProfile: PropTypes.func.isRequired,
        signingOut: PropTypes.bool.isRequired
    };

    constructor({ getProfile }) {
        super();
        getProfile();
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
    signOut: () => dispatch(signOutThunk),
    getProfile: () => dispatch(requestProfile())
}))(HomeScreen);
