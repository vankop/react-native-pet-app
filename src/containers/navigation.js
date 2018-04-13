import { StackNavigator, DrawerNavigator, SwitchNavigator } from 'react-navigation';

import LandingScreen from './LandingScreen';
import FirstScreen from './FirstScreen';
import SecondScreen from './SecondScreen';
import ModalScreen from './ModalScreen';
import SignInScreen from './notAuthorized/SignInScreen';
import LoadingScreen from './LoadingScreen';

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
