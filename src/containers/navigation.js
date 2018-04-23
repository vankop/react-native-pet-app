import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
    TabNavigator,
    StackNavigator,
    SwitchNavigator,
    TabBarBottom,
    DrawerNavigator
} from 'react-navigation';

import LandingScreen from './authorized/HomeScreen';
import ProfileScreen from './authorized/ProfileScreen';
import SignInScreen from './notAuthorized/SignInScreen';
import LoadingScreen from './LoadingScreen';
import {unauthorizedAppState} from '../security/appState';
import {inactiveColor, mainColor} from '../design/colors';

const MainStack = TabNavigator({
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

const AppStack = DrawerNavigator({
    Home: {
        screen: LandingScreen,
        navigationOptions: {
            title: 'Стартовая'
        }
    }
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
