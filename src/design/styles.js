import {StyleSheet} from 'react-native';
import { Platform } from 'react-native';

import {inactiveColor} from './colors';

export default StyleSheet.create({
    fill: {
        flex: 1
    },
    raw: {
        flexDirection: 'row'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signIn: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        paddingRight: 50,
        paddingLeft: 50
    },
    signOutButton: {
        height: 200
    },
    list: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'flex-start'
    },
    listItem: {
        margin: 10,
        paddingLeft: 10,
        borderBottomWidth: 0.5,
        borderColor: inactiveColor,
        height: 50
    },
    headerStyle: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10
    },
    bar: {
        marginTop: 28,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listTitle: {
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: 18,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    dividerView: {
        height: 0.5,
        backgroundColor: inactiveColor
    },
    panel: {
        zIndex: 50,
        margin: 10,
        padding: 10,
        elevation: 2, // SHADOW ONLY FOR ANDROID,
        backgroundColor: Platform.OS === 'ios' ? '#F7F7F7' : '#FFF'
    },
    panelContainer: {
        backgroundColor: inactiveColor,
        zIndex: 1
    },
    panelHeader: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    panelTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'left'
    }
});
