import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

import {connect} from 'react-redux';
import {signOutThunk} from '../../redux/thunks/session';
import {signOutAppState} from '../../security/appState';
import styles from '../../design/styles';
import {requestProfile} from '../../redux/stores/profileStore';
import {mainColor} from '../../design/colors';

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
            <View key={1} style={styles.container}>
                <Icon name="accessibility" size={30} color={mainColor} />
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
