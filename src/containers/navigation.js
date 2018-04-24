import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
    StackNavigator,
    SwitchNavigator,
    DrawerNavigator
} from 'react-navigation';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Touchable from 'react-native-platform-touchable';

import LandingScreen from './authorized/HomeScreen';
import ProfileScreen from './authorized/ProfileScreen';
import SignInScreen from './notAuthorized/SignInScreen';
import LoadingScreen from './LoadingScreen';
import {unauthorizedAppState} from '../security/appState';
import {mainColor} from '../design/colors';
import icons from '../design/icons';
import SideMenu from './SideMenu';
import MenuButton from '../components/MenuButton';
import HeaderLeft from '../components/HeaderLeft';
import styles from '../design/styles';

const MainStack = StackNavigator({
    Home: {
        screen: LandingScreen,
        navigationOptions: ({navigation}) => ({
            title: 'Домашняя',
            headerLeft: (
                <HeaderLeft>
                    <MenuButton navigation={navigation} />
                </HeaderLeft>
            ),
            headerTitleStyle: styles.headerStyle,
            headerStyle: styles.fill
        })
    }
}, {

});

const ProfileStack = StackNavigator({
    Profile: {
        screen: ProfileScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Профиль',
            headerLeft: (
                <HeaderLeft>
                    <MenuButton navigation={navigation} />
                </HeaderLeft>
            ),
            headerTitleStyle: styles.headerStyle,
            headerStyle: styles.fill
        })
    }
});

const AppStack = DrawerNavigator({
    Home: {
        screen: MainStack,
        navigationOptions: {
            title: 'Стартовая',
            drawerIcon: <Icon name="home" color={mainColor} size={icons.size.small} />
        }
    },
    Profile: {
        screen: ProfileStack,
        navigationOptions: {
            title: 'Профиль',
            drawerIcon: <Icon name="person" color={mainColor} size={icons.size.small} />
        }
    }
}, {
    initialRouteName: 'Home',
    contentComponent: SideMenu
});

class App extends Component {
    static getDerivedStateFromProps({ appState, navigation }) {
        if (appState === unauthorizedAppState) {
            navigation.navigate('Auth');
        }
    }

    render() {
        return <AppStack />;
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
