import React from 'react';
import {connect} from 'react-redux';
import { StackNavigator, DrawerNavigator, SwitchNavigator } from 'react-navigation';

import LandingScreen from './authorized/LandingScreen';
import FirstScreen from './authorized/FirstScreen';
import SecondScreen from './authorized/SecondScreen';
import ModalScreen from './authorized/ModalScreen';
import SignInScreen from './notAuthorized/SignInScreen';
import LoadingScreen from './LoadingScreen';
import {signOutThunkCreator} from '../redux/thunks/signout';

export const MainStack = StackNavigator({
    Home: { screen: LandingScreen },
    // First: { screen: FirstScreen },
    Second: { screen: SecondScreen }
});

const App = connect(
    null,
    (dispatch, { navigation }) => ({
        signOut: () => dispatch(signOutThunkCreator(navigation))
    })
)(({ signOut }) => <MainStack screenProps={signOut} />);

export const AppStack = DrawerNavigator({
    Main: {
        screen: MainStack,
    },
    MyModal: {
        screen: ModalScreen,
    },
}, {
    mode: 'modal',
    headerMode: 'none',
});

export const AuthStack = StackNavigator({
    Main: {
        screen: SignInScreen
    }
});

export const RootStack = SwitchNavigator(
    {
        AuthLoading: LoadingScreen,
        App,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading'
    }
);
