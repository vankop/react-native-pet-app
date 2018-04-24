import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, Text, View} from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

import Logger from '../utils/logger';
import styles from '../design/styles';
import {signOutAppState} from '../security/appState';
import icons from '../design/icons';
import {inactiveColor, mainColor} from '../design/colors';
import signout from '../redux/thunks/signout';

const extraMenuItems = [
    { key: 'signout', route: 'signOut' }
];

const renderIcon = () => (
    <Icon
        name="exit-to-app"
        size={icons.size.small}
        color={mainColor}
    />
);

const getLabel = () => 'Сменить пользователя';

const labelContainerStyle = {
    top: 0,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
};

const dividerStyle = {
    height: 0.5,
    backgroundColor: inactiveColor,
    margin: 10
};

const bottomGroupContainerStyle = {
    flex: 1,
    justifyContent: 'flex-end'
};

function SideMenu({ signingOut, signOut, ...rest }) {
    Logger.debug(rest);

    return (
        <SafeAreaView style={styles.fill} forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={labelContainerStyle}>
                <Icon name="local-parking" size={icons.size.large} color={mainColor} />
                <Text>ЕМП</Text>
            </View>
            <ScrollView style={styles.fill}>
                <DrawerItems {...rest} />
            </ScrollView>
            <ScrollView style={styles.fill} contentContainerStyle={bottomGroupContainerStyle}>
                <View style={dividerStyle} />
                <DrawerItems
                    {...rest}
                    items={extraMenuItems}
                    onItemPress={signOut}
                    renderIcon={renderIcon}
                    getLabel={getLabel}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

SideMenu.propTypes = {
    signOut: PropTypes.func.isRequired,
    signingOut: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string,
        routeName: PropTypes.string
    })).isRequired
};

export default connect(state => ({
    signingOut: state.appState === signOutAppState
}), dispatch => ({
    signOut: () => dispatch(signout)
}))(SideMenu);
