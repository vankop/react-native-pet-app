import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
    TabNavigator,
    StackNavigator,
    SwitchNavigator,
    TabBarBottom
} from 'react-navigation';

import LandingScreen from './authorized/HomeScreen';
import ProfileScreen from './authorized/ProfileScreen';
import SignInScreen from './notAuthorized/SignInScreen';
import LoadingScreen from './LoadingScreen';
import {unauthorizedAppState} from '../security/appState';
import {signOutThunk} from '../redux/thunks/session';
import {inactiveColor, mainColor} from '../design/colors';

export const MainStack = TabNavigator({
    Home: {
        screen: LandingScreen,
        navigationOptions: {
            title: 'Home'
        }
    },
    Profile: {
        screen: ProfileScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Profile'
        })
    },
}, {
    tabBarOptions: {
        activeTintColor: mainColor,
        inactiveTintColor: inactiveColor,
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
    lazy: false
});

class App extends Component {
    static getDerivedStateFromProps({ appState, navigation }) {
        if (appState === unauthorizedAppState) {
            navigation.navigate('Auth');
        }
    }

    render() {
        return <MainStack />;
    }
}

const ConnectedApp = connect(
    state => ({
        appState: state.appState
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
