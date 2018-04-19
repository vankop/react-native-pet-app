import React, { Component } from 'react';
import {connect} from 'react-redux';
import { StackNavigator, SwitchNavigator } from 'react-navigation';

import LandingScreen from './authorized/LandingScreen';
import FirstScreen from './authorized/FirstScreen';
import SecondScreen from './authorized/SecondScreen';
import ModalScreen from './authorized/ModalScreen';
import SignInScreen from './notAuthorized/SignInScreen';
import LoadingScreen from './LoadingScreen';
import {unauthorizedAppState} from '../security/appState';
import {signOutThunk} from '../redux/thunks/session';

export const MainStack = StackNavigator({
    Home: { screen: LandingScreen },
    // First: { screen: FirstScreen },
    Second: { screen: SecondScreen }
});

class App extends Component {
    static getDerivedStateFromProps({ appState, navigation }) {
        if (appState === unauthorizedAppState) {
            navigation.navigate('Auth');
        }
    }

    render() {
        const { signOut } = this.props;
        return <MainStack screenProps={signOut} />;
    }
}

const ConnectedApp = connect(
    state => ({
        appState: state.appState
    }),
    dispatch => ({
        signOut: () => dispatch(signOutThunk)
    })
)(App);

export const AuthStack = StackNavigator({
    Main: {
        screen: SignInScreen
    }
});

export const RootStack = SwitchNavigator(
    {
        AuthLoading: LoadingScreen,
        App: ConnectedApp,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading'
    }
);
