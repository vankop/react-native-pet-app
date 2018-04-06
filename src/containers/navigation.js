import { StackNavigator, DrawerNavigator } from 'react-navigation';

import LandingScreen from './LandingScreen';
import FirstScreen from './FirstScreen';
import SecondScreen from './SecondScreen';
import ModalScreen from './ModalScreen';

export const MainStack = StackNavigator({
    Home: { screen: LandingScreen },
    First: { screen: FirstScreen },
    Second: { screen: SecondScreen }
});

export const RootStack = DrawerNavigator(
    {
        Main: {
            screen: MainStack,
        },
        MyModal: {
            screen: ModalScreen,
        },
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
);
