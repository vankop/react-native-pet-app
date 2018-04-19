import {StyleSheet} from 'react-native';
import {inactiveColor} from './colors';

export default StyleSheet.create({
    fill: {
        flex: 1
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
        padding: 10,
        borderBottomWidth: 1,
        borderColor: inactiveColor,
        height: 60
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#03A9F4',
        overflow: 'hidden',
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
    }
});
