import { StackNavigator, DrawerNavigator, SwitchNavigator } from 'react-navigation';

import LandingScreen from './LandingScreen';
import FirstScreen from './authorized/FirstScreen';
import SecondScreen from './authorized/SecondScreen';
import ModalScreen from './authorized/ModalScreen';
import SignInScreen from './notAuthorized/SignInScreen';
import LoadingScreen from './RootScreen';

export const MainStack = StackNavigator({
    Home: { screen: LandingScreen },
    First: { screen: FirstScreen },
    Second: { screen: SecondScreen }
});

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
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading'
    }
);
